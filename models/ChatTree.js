const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  text: { type: String, required: true },
  nextNodeId: { type: String, default: null },
});

const nodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  responses: [responseSchema],
});

const chatTreeSchema = new mongoose.Schema({
  businessId: { type: String, required: true },
  nodes: [nodeSchema], // Array of nodes in the chat tree
});

const ChatTree = mongoose.model("ChatTree", chatTreeSchema);
module.exports = ChatTree;
