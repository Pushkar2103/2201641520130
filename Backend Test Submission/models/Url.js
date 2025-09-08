import mongoose from "mongoose"

const clickSchema = new mongoose.Schema({
  timestamp: Date,
  source: String,
  location: String
})

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortcode: { type: String, unique: true },
  createdAt: Date,
  expiry: Date,
  clicks: [clickSchema]
})

export default mongoose.model('Url', urlSchema);
