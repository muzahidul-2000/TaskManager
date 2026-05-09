import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Side";
import MyTasks from "./Tasks";

function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  const getHeading = () => {
    if (location.pathname === "/dashboard") {
      return "My Tasks";
    }
    if (location.pathname.includes("/create")) {
      return "Create Task";
    }
    if (location.pathname.includes("/tasks")) {
      return "My Tasks";
    }
    if (location.pathname.includes("/pending")) {
      return "Pending Tasks";
    }
    if (location.pathname.includes("/completed")) {
      return "Completed Tasks";
    }
    if (location.pathname.includes("/in-progress")) {
      return "In Progress Tasks";
    }
    return "Dashboard";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {getHeading()}
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;