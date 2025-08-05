// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/eventdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema for Users
const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
});

// Schema for Contact Messages
const Message = mongoose.model("Message", {
  name: String,
  email: String,
  number: String,
  subject: String,
  message: String,
});

// Signup
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  res.send("Signup successful");
});

// Login (basic version)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.send("Login successful");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Contact
app.post("/contact", async (req, res) => {
  const { name, email, number, subject, message } = req.body;
  const contactMessage = new Message({ name, email, number, subject, message });
  await contactMessage.save();
  res.send("Message received");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
