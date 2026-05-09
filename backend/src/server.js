import express from "express";
import cors from "cors";
import User from "./models/user.model.js";
import ConnectDb from "./config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "./utils/hash.js";
import generateToken from "./utils/token.js";
import dotenv from 'dotenv';
import { verifyToken } from "./middleware/auth.middleware.js";
import Task from "./models/tasks.model.js";

dotenv.config();

const app = express();
const saltRounds = 10;
const PORT = process.env.PORT;

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

app.get("/tasks", verifyToken, async (req, res) => {
  try {
    const filter = {
      userId: req.user.userId
    };

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      message: "Fetch successful",
      tasks
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/tasks", verifyToken, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTask = await Task.create({
      title,
      description,
      status,
      userId: req.user.userId
    });
    console.log(newTask);
    res.status(201).json({
      message: "Task created successfully",
      task: newTask
    });

  } catch (err) {
    res.status(500).json({
      message: "Error creating task",
      error: err.message
    });
  }
});

app.delete('/tasks/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.deleteOne({ _id: id });

    if (task.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Delete successful",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/tasks/:id", verifyToken, async (req, res) => {
  try {

    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId
      },
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(updatedTask);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      username: user.username,
      email: user.email
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

app.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "Authorized",
    userId: req.user.userId
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});