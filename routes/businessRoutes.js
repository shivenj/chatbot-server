// routes/businessRoutes.js
const express = require("express");
const { createBusiness } = require("../controllers/businessController");

const router = express.Router();

router.post("/", createBusiness); // Create a business

module.exports = router;
