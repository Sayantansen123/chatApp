import Conversation from "../Models/conversationModel.js";
import Message from "../Models/messageSchema.js";

export const sendMessage = async(req,res) =>{
    try {
        const {message} = req.body;
        const {id:reciverId} = req.params;
        const senderId = req.user._condition._id;

        
    let chats = await Conversation.findOne({
        participants:{$all:[senderId , reciverId]}
    })

    if(!chats){
        chats = await Conversation.create({
            participants:[senderId , reciverId],
        })
    }

    const newMessages = new Message({
        senderId,
        reciverId,
        message,
        conversationId: chats._id
    })

    if(newMessages){
        chats.messages.push(newMessages._id);
    }

    await Promise.all([chats.save(),newMessages.save()]);//for fast saving the messages

    res.status(201).send(newMessages)

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(`error in sendMessage ${error}`);
    }
}