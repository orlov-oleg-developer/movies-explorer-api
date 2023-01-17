const mongoose = require('mongoose');

const { mailRegex } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: mailRegex,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
