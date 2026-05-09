import React, { useEffect, useState } from "react";
import TaskForm from "../components/Content";

function CompletedTasks() {

  const token = localStorage.getItem("token");
  const [taskData, setTaskData] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {

    try {
      const response = await fetch("http://localhost:5000/tasks?status=completed", {
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

  return (
    <div className="p-6">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompletedTasks;