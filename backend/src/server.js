import express from "express";
import cors from "cors";
import User from "./models/user.model.js";
import ConnectDb from "./config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "./utils/hash.js";
import generateToken from "./utils/token.js";
import dotenv from "dotenv";
import { verifyToken } from "./middleware/auth.middleware.js";

const app = express();
const saltRounds = 10;

app.use(cors());
app.use(express.json());

ConnectDb();

app.post("/users", async (req, res) => {
  try {
    const userP = await User.findOne({ email: req.body.email });

    if (userP) {
      return res.status(400).json({
        message: "User already exists with this email."
      });
    }

    const hashedPassword = await hashPassword(req.body.password);

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    res.status(201).json(newUser);

  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
});


app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatched = await comparePassword(password, user.password);

    if (!isMatched) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "Authorized",
    userId: req.user.userId
  });
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});