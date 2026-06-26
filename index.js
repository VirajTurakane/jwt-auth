import dotenv from "dotenv";
dotenv.config();

import express from "express";

import jwt from "jsonwebtoken";
import { authMiddleware } from "./authmiddleware.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

const todos = [
  {
    id: 1,
    task: "Go to gym",
  },
];

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    msg: "Server hit",
  });
});

// Protected
app.post("/todos", authMiddleware, (req, res) => {
  return res.json({
    todos,
  });
});

// Authentication Routes
app.post("/signup", (req, res) => {
  const body = req.body;

  const { name, email } = body;

  const token = jwt.sign({ name, email }, SECRET, {
    expiresIn: "1m",
  });

  return res.json({
    token,
  });
});

app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));
