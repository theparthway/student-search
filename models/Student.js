const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  roomNumber: String
});

module.exports = mongoose.model('Student', StudentSchema);
