# Task Manager App

A full-stack MERN Task Manager application with secure authentication and protected routes. Users can register, log in, create tasks, and manage their profiles.

---

## 🚀 Features

- User Signup & Login
- JWT Authentication
- Protected Routes
- Password Hashing with bcrypt
- Create Tasks
- User-specific Tasks
- Profile Page
- MongoDB Integration
- Responsive UI using Tailwind CSS

---

## 🛠 Tech Stack

### Frontend
- React
- React Router DOM
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

---

## 📁 Folder Structure

```bash
project/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── verifyToken.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   └── task.model.js
│   │
│   ├── utils/
│   │   ├── bcrypt.js
│   │   └── generateToken.js
│   │
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│
└── README.md
