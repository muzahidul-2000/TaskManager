import react, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function SignupPage() {

  const navigate=useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      navigate("/login");
      console.log("Success:", data);
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleClick() {
    navigate('/login');
    console.log("Login button clicked!");
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          
          <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <label className="block">
              <span className="text-gray-700">Username</span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>

          <button
            onClick={handleClick}
            className="w-full mt-4 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            Login
          </button>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

        </div>
      </div>

    </>
  )
}

export default SignupPage;