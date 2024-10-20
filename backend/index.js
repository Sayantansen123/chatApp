import express from 'express'
import dotenv from 'dotenv'
import connectDB from './Database/connectDB.js'
import authRouter from  './route/authRoute.js'
import messageRouter from './route/messageRoute.js'
import cookieParser from 'cookie-parser'
import userRouter from './route/userRout.js'

const app = express()


dotenv.config() // configuring the enviorement variables

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)
app.use('/api/user',userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  connectDB();
  console.log(`Example app listening on port ${PORT}`)
})
