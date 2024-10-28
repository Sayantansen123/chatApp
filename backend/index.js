import express from 'express'
import dotenv from 'dotenv'
import connectDB from './Database/connectDB.js'
import authRouter from  './route/authRoute.js'
import messageRouter from './route/messageRoute.js'
import cookieParser from 'cookie-parser'
import userRouter from './route/userRout.js'
import path from 'path'
import {app , server} from './Socket/socket.js'



const __dirname = path.resolve(); // deployement purpose

dotenv.config() // configuring the enviorement variables

app.use(express.json()) //middleware to parse json
app.use(cookieParser()) //middleware to parse cookies

app.use('/api/auth',authRouter) //route redirected to authentication route 
app.use('/api/message',messageRouter) //route redirected to message route
app.use('/api/user',userRouter) //route redirected to user route



//deployement purpose
app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})


const PORT = process.env.PORT || 3000  //port 

server.listen(PORT, () => {
  connectDB();
  console.log(`Example app listening on port ${PORT}`)
})
