// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chatRoutes = require("./routes/chatRoutes");
const businessRoutes = require("./routes/businessRoutes");

dotenv.config(); // Load environment variables from .env

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// MongoDB connection (MongoDB Atlas or local)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected to Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/business", businessRoutes);

// Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// Export the app instead of app.listen for Vercel serverless function
module.exports = app;
