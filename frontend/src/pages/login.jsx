import react, { useState }  from "react";
import { Navigate, useNavigate } from "react-router-dom";

function LoginPage(){
  const [error,setError]=useState("");
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
  
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if(!res.ok){
        setError(data.message);
        return;
      }
      localStorage.setItem("token", data.token);    
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  }
  
    function handleChange(e) {
      const { name, value } = e.target;
  
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  
    return (
      <>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl space-y-5"
        >
          <h2 className="text-2xl font-semibold text-center">Login</h2>

          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </form>
  
      </>
    )
}

export default LoginPage;