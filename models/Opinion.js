const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OpinionSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  text: {
    type: String,
    required: true
  },
  answer: {
    type: String
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('opinion', OpinionSchema)
