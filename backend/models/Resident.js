const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
  flatNo: String,
  towerName: String,
  residentType: String, // ✅ Add this field to match your frontend
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
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model("Resident", residentSchema);
