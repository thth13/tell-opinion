const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  // name: {
  //   type: String
  // },
  // description: {
  //   type: String
  // },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  // social: {
  //   instagram: {
  //     type: String
  //   },
  //   vk: {
  //     type: String
  //   }
  // },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);
