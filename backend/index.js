import express from 'express'
import dotenv from 'dotenv'

const app = express()


dotenv.config() // configuring the enviorement variables

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
