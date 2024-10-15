const ChatTree = require("../models/ChatTree");

// Get chat tree by businessId
exports.getChatTree = async (req, res) => {
  const { businessId } = req.params;
  try {
    const chatTree = await ChatTree.findOne({ businessId });
    if (!chatTree) {
      return res.status(404).json({ message: "Chat tree not found" });
    }
    res.json(chatTree);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Save or update chat tree for a business
exports.saveChatTree = async (req, res) => {
  const { businessId } = req.params;
  const { nodes } = req.body;

  try {
    let chatTree = await ChatTree.findOne({ businessId });
    if (chatTree) {
      chatTree.nodes = nodes; // Update nodes if already exists
    } else {
      chatTree = new ChatTree({ businessId, nodes }); // Create new tree
    }

    await chatTree.save();
    res.json(chatTree);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
