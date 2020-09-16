const mongoose = require('mongoose');
const empSchema = new mongoose.Schema({
  empName: {
    type: String,
    required: true,
  },  empEmail: {
    type: String,
    required: true,
  },
})
module.exports = mongoose.model('Emp',empSchema)