// controllers/businessController.js
const Business = require("../models/Business");

// Create or find business by businessId
exports.createBusiness = async (req, res) => {
  const { businessId, name } = req.body;

  try {
    let business = await Business.findOne({ businessId });
    if (!business) {
      business = new Business({ businessId, name });
      await business.save();
    }

    res.json(business);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
