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

// Update a single node by its ID (Add/Remove Responses)
exports.updateNode = async (req, res) => {
  const { businessId, nodeId } = req.params;
  const { question, responses } = req.body;

  try {
    let chatTree = await ChatTree.findOne({ businessId });
    if (!chatTree) {
      return res.status(404).json({ message: "Chat tree not found" });
    }

    // Find the node to update
    const node = chatTree.nodes.find((n) => n.id === nodeId);
    if (!node) {
      return res.status(404).json({ message: "Node not found" });
    }

    // Update the question and responses
    node.question = question;
    node.responses = responses;

    await chatTree.save();
    res.json(node);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a node by its ID
exports.deleteNode = async (req, res) => {
  const { businessId, nodeId } = req.params;

  try {
    let chatTree = await ChatTree.findOne({ businessId });
    if (!chatTree) {
      return res.status(404).json({ message: "Chat tree not found" });
    }

    // Filter out the node to delete
    chatTree.nodes = chatTree.nodes.filter((n) => n.id !== nodeId);

    // Remove references to this node as `nextNodeId` in other responses
    chatTree.nodes.forEach((node) => {
      node.responses.forEach((response) => {
        if (response.nextNodeId === nodeId) {
          response.nextNodeId = null; // Set to null or handle as needed
        }
      });
    });

    await chatTree.save();
    res.json({ message: "Node deleted", updatedTree: chatTree.nodes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
