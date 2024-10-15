// routes/chatRoutes.js
const express = require("express");
const { getChatTree, saveChatTree } = require("../controllers/chatController");

const router = express.Router();

router.get("/:businessId", getChatTree); // Get chat tree by businessId
router.post("/:businessId", saveChatTree); // Save chat tree

module.exports = router;
