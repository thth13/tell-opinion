const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
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
  opinions: [{
    user: {
      type: Schema.Types.ObjectId
    },
    text: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);
