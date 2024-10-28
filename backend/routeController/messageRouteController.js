import Conversation from "../Models/conversationModel.js";
import Message from "../Models/messageSchema.js";
import { getReciverSocketId, io } from "../Socket/socket.js";

export const sendMessage = async(req,res) =>{
    try {
        //getting the message from the body
        const {message} = req.body;
        //getting the reciver id
        const {id:reciverId} = req.params;
        //getting the current user id
        const senderId = req.user._conditions._id;

    //getting the chats array between those two people
    let chats = await Conversation.findOne({
        participants:{$all:[senderId , reciverId]}
    })


    //if there is no chat between create a new conversation
    if(!chats){
        chats = await Conversation.create({
            participants:[senderId , reciverId],
        })
    }
    
    //sending all the data
    const newMessages = new Message({
        senderId,
        reciverId,
        message,
        conversationId: chats._id
    })
    //if there is already a conversation push into the array
    if(newMessages){
        chats.messages.push(newMessages._id);
    }

    //save the chats and newMessages together
    await Promise.all([chats.save(),newMessages.save()]);//for fast saving the messages

    //socket

    const reciverSocketId = getReciverSocketId(reciverId);
     if(reciverSocketId){
        io.to(reciverSocketId).emit("newMessage",newMessages)
     }

    res.status(201).send(newMessages)

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(`error in sendMessage ${error}`);
    }
}

export const getMessages=async(req,res)=>{
    try {
        //getting the reciverId
        const {id:reciverId} = req.params;
        //getting the senderId
        const senderId = req.user._conditions._id;
        //fetching the conversation
        const chats = await Conversation.findOne({
            participants:{$all:[senderId , reciverId]}
        }).populate("messages")
    
        if(!chats)  return res.status(200).send([]);
        //fetching the messages
        const message = chats.messages;
        res.status(200).send(message)
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(`error in getMessage ${error}`);
    }
    }