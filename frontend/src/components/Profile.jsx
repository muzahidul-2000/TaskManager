import React, { useState, useEffect } from "react";

function Profile() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message);
        return;
      }

      setEmail(data.email);
      setUserName(data.username);

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col items-center border-b border-gray-700 pb-6">

      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold shadow-lg">
        {userName?.charAt(0).toUpperCase()}
      </div>

      {/* Username */}
      <h2 className="mt-4 text-xl font-semibold text-white">
        {userName}
      </h2>

      {/* Email */}
      <p className="text-sm text-gray-400 break-all text-center mt-1">
        {email}
      </p>

    </div>
  );
}

export default Profile;