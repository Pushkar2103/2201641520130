import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routes from './routes/shorturl.js'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/shorturls', routes)

const mongoUri = process.env.MONGO_URI
const port = process.env.PORT || 3000

if (!mongoUri) {
  process.exit(1)
}

mongoose.connect(mongoUri).then(() => {app.listen(port, () => {})})
