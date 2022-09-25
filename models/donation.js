const mongoose = require("mongoose");
// const validator = require("validator");

const Donation = new mongoose.Schema({
  donorName: {
    type: String,
    trim: true,
  },

  donationType: { type: String, required: true },
  donorNotes: { type: String, trim: true, required: true },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  amount: { type: String, trim: true },
  address: { type: String, trim: true },
});

const model = mongoose.model("donation-data", Donation);
module.exports = model;
