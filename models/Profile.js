const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  login: {
    type: String
  },
  avatar: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  views: {
    type: Number,
    default: 0
  },
  verifed: {
    type: Boolean,
    default: false
  },
  social: {
    instagram: {
      type: String
    },
    facebook: {
      type: String
    },
    youtube: {
      type: String
    },
    twitter: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('profile', ProfileSchema)
