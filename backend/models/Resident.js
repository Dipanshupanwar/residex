const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
  flatNo: String,
  name: String,
  mobile: String,
  email: String,
  vehicle: Boolean,
  fourWheeler: Boolean,
  fourWheelerNumber: String,
  twoWheeler: Boolean,
  twoWheelerNumber: String,
  residentType: String,
}, {
  timestamps: true  // ✅ This adds createdAt and updatedAt automatically
});

module.exports = mongoose.model("Resident", residentSchema);
