import { useState } from 'react'
import SignupPage from './pages/signup'
import LoginPage from './pages/login'
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/dashBoard.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignupPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
        />
    </Routes>

  )
}

export default App
