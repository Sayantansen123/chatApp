import mongoose from "mongoose";


//conversation between multiple user is stored with their respected messages id 
const conversationSchema = mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[]
        }
    ]
},{timestamps:true})

const Conversation = mongoose.model('Conversation',conversationSchema)

export default Conversation;