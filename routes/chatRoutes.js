const express = require("express");
const {
  getChatTree,
  saveChatTree,
  updateNode,
  deleteNode,
} = require("../controllers/chatController");

const router = express.Router();

router.get("/:businessId", getChatTree); // Get chat tree by businessId
router.post("/:businessId", saveChatTree); // Save chat tree
router.put("/:businessId/node/:nodeId", updateNode); // Update a specific node
router.delete("/:businessId/node/:nodeId", deleteNode); // Delete a specific node

module.exports = router;
