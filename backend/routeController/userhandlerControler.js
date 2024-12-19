import Conversation from "../Models/conversationModel.js";
import User from "../Models/userModel.js";

export const getUserBySearch = async (req, res) => {
    try {
        //getting the input from url api/search?searchs="your input"

        const search = req.query.searchs || '';
        //getting the current user id
        const currentUserID = req.user._conditions._id;
        //making the search 
        const user = await User.find({
            $and: [
                {
                    $or: [
                        { username: { $regex: '.*' + search + '.*', $options: 'i' } },
                        
                    ]
                }, {
                    _id: { $ne: currentUserID } //assure that the user which is logged in cant search himself
                }
            ]
        }).select("-password").select("email")

        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);

    }
}

export const getCorrentChatters = async (req, res) => {
    try {
        //geting the current user logged in
        const currentUserID = req.user._conditions._id;
        //fetching all the conversation done by this user by searching the id from the conversation model
        const currenTChatters = await Conversation.find({
            participants: currentUserID
        }).sort({
            updatedAt: -1
        });

        //Empty chats
        if (!currenTChatters || currenTChatters.length === 0) return res.status(200).send([]);
        
        //reduces the participants array and eliminates the current user id and getting all other user id in a single array
        const partcipantsIDS = currenTChatters.reduce((ids, conversation) => {
            const otherParticipents = conversation.participants.filter(id => id !== currentUserID);
            return [...ids, ...otherParticipents]
        }, [])

        const otherParticipentsIDS = partcipantsIDS.filter(id => id.toString() !== currentUserID.toString());
        
        //finding all the user that chatted with him
        const user = await User.find({ _id: { $in: otherParticipentsIDS } }).select("-password").select("-email");

        const users = otherParticipentsIDS.map(id => user.find(user => user._id.toString() === id.toString()));

        res.status(200).send(users)

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}