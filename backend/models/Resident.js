const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
  flatNo: String,
  residentType: String,
  name: String,
  mobile: String,
  email: String,
  vehicle: Boolean,
  fourWheeler: Boolean,
  fourWheelerNumber: String,
  twoWheeler: Boolean,
  twoWheelerNumber: String,
});

module.exports = mongoose.model('Resident', residentSchema);
