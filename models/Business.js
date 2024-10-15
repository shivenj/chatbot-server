const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  businessId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Business = mongoose.model("Business", businessSchema);
module.exports = Business;
