import react from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';

function Sidebar(){
  const navigate = useNavigate();

  function handleCreate() {
    navigate("/dashboard/create");
  }

  function handleTasks() {
    navigate("/dashboard");
  }

  function handlePending() {
    navigate("/dashboard/pending");
  }

  function handleComplete() {
    navigate("/dashboard/completed");
  }

  function handleInProgress() {
    navigate("/dashboard/in-progress");
  }
  
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return(
    <div className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col justify-between">

      <div>

        {/* Profile Section */}
        <div className="flex flex-col items-center border-b border-gray-700 pb-6">

          <Profile />

        </div>


        {/* Menu Buttons */}
        <div className="mt-6 flex flex-col gap-3">

          <button onClick={handleCreate} className="w-full text-left px-4 py-2 rounded-lg bg-gray-800 hover:bg-blue-500 transition">
            CreateTask
          </button>

          <button onClick={handleTasks} className="w-full text-left px-4 py-2 rounded-lg bg-gray-800 hover:bg-blue-500 transition">
            My Tasks
          </button>

          <button onClick={handlePending} className="w-full text-left px-4 py-2 rounded-lg bg-gray-800 hover:bg-yellow-500 transition">
            Pending
          </button>

          <button onClick={handleComplete} className="w-full text-left px-4 py-2 rounded-lg bg-gray-800 hover:bg-green-500 transition">
            Completed
          </button>

          <button onClick={handleInProgress} className="w-full text-left px-4 py-2 rounded-lg bg-gray-800 hover:bg-green-500 transition">
            In-Progress
          </button>

        </div>

      </div>


      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>

    </div>
  )
}

export default Sidebar;