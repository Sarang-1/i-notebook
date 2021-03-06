const mongoose = require("mongoose");
const {Schema} = mongoose;

// making user indexes
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    default: 'General'
  },
  date:{
    type: Date,
    default: Date.now
},
});

module.exports = mongoose.model('User',UserSchema);