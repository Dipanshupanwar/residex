const express = require('express');
const router = express.Router();
const Resident = require('../models/Resident');

// Add data
router.post('/submit', async (req, res) => {
  try {
    const data = new Resident(req.body);
    await data.save();
    res.status(201).json({ message: "Form submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//delet 
// DELETE: Delete a resident by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Resident.findByIdAndDelete(id); // ✅ FIXED HERE
    res.status(200).json({ success: true, message: "Resident deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// Get all
router.get('/data', async (req, res) => {
  const residents = await Resident.find();
  res.json(residents);
});

// Search by flat no
router.get('/search/:flatNo', async (req, res) => {
  const resident = await Resident.findOne({ flatNo: req.params.flatNo });
  res.json(resident);
});

// Update data
router.put('/update/:_id', async (req, res) => {
  await Resident.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
});

// Admin login
router.post('/admin-login', (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
    return res.json({ success: true });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
