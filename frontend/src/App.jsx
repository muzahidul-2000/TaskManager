import { useState } from 'react'
import SignupPage from './pages/signup'
import LoginPage from './pages/login'
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/dashBoard.jsx';
import TaskForm from './components/Content.jsx';
import MyTasks from './pages/Tasks.jsx';
import PendingTasks from './components/PendingTasks.jsx';
import CompletedTasks from './components/CompletedTasks.jsx';
import InProgress from './components/Inprogress.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<MyTasks />} />
        <Route path='in-progress' element={<InProgress/>}/>
        <Route path="create" element={<TaskForm />} />
        <Route path="pending" element={<PendingTasks />} />
        <Route path="completed" element={<CompletedTasks />} />
      </Route>
    </Routes>

  )
}

export default App
