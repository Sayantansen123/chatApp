import express from 'express'
import dotenv from 'dotenv'
import connectDB from './Database/connectDB.js'
import authRouter from  './route/authRoute.js'

const app = express()


dotenv.config() // configuring the enviorement variables

app.use(express.json())

app.use('/api/auth',authRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  connectDB();
  console.log(`Example app listening on port ${PORT}`)
})
