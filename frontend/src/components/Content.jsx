import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskForm({ editTask, setEditTask, fetchTasks }) {
  const token = localStorage.getItem("token");
  const navigate=useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  useEffect(() => {

    if (editTask) {
      setTaskData({
        title: editTask.title,
        description: editTask.description,
        status: editTask.status,
      });
    } else {
      setTaskData({
        title: "",
        description: "",
        status: "pending",
      });
    }

  }, [editTask]);

  function handleChange(e) {

    const { name, value } = e.target;

    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {
      if (editTask) {
        const response = await fetch(`http://localhost:5000/tasks/${editTask._id}`,{
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(taskData),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message);
          return;
        }

        console.log("Task Updated:", data);
        setEditTask(null);
      }else {

        const response = await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(taskData),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message);
          return;
        }

        console.log("Task Created:", data);
      }

      if (fetchTasks) {
        fetchTasks();
      }

      setTaskData({
        title: "",
        description: "",
        status: "pending",
      });

      navigate('/dashboard');

    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-6 p-6 shadow-lg rounded-2xl bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editTask ? "Edit Task" : "Create Task"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={taskData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={taskData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          name="status"
          value={taskData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="pending">
            Pending
          </option>
          <option value="in-progress">
            In Progress
          </option>
          <option value="completed">
            Completed
          </option>
        </select>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            {editTask ? "Update Task" : "Add Task"}
          </button>

          {editTask && (
            <button
              type="button"
              onClick={() => setEditTask(null)}
              className="flex-1 bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          )}

        </div>

      </form>
    </div>
  );
}

export default TaskForm;