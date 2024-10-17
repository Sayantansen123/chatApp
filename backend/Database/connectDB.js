import mongoose from "mongoose"

const connectDB = async () => {
    try{
         await mongoose.connect(process.env.MONGO_CONNECT)
         console.log("DB CONNECTED SUCCESFULLY")
    }catch(error){
         console.log("DB can't be connected",error)
    }
}

export default connectDB;
