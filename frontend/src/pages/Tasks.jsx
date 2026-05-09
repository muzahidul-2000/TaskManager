import React, { useEffect, useState } from "react";
import TaskForm from "../components/Content";

function MyTasks() {

  const token = localStorage.getItem("token");
  const [taskData, setTaskData] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {

    try {
      const response = await fetch("http://localhost:5000/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setTaskData(data.tasks);

    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {

    try {

      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Delete failed");
        return;
      }

      setTaskData((prev) =>
        prev.filter((task) => task._id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  return (
    <div className="p-6">
      {editTask && (
        <div className="mb-8">
          <TaskForm
            editTask={editTask}
            setEditTask={setEditTask}
            fetchTasks={fetchTasks}
          />

        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {taskData.map((task) => (
          <div
            key={task._id}
            className="p-4 bg-white shadow rounded-xl"
          >
            <h2 className="text-lg font-bold">
              {task.title}
            </h2>
            <p className="text-gray-600 mt-2">
              {task.description}
            </p>

            <p className="text-sm mt-2">
              Status:
              <span className="font-medium ml-1">
                {task.status}
              </span>
            </p>

            <p className="text-xs text-gray-400 mt-3">
              Created:
              {" "}
              {new Date(task.createdAt).toLocaleString()}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Updated:
              {" "}
              {new Date(task.updatedAt).toLocaleString()}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(task)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(task._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTasks;