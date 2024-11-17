import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clear tokens, etc.)
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="bg-[#f6f8e0] min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-5">Welcome to the Dashboard</h1>
      <p className="text-xl mb-5">You are logged in!</p>
      <button
        onClick={handleLogout}
        className="bg-black text-white p-4 rounded-md"
      >
        Log Out
      </button>
      <div className="mt-10">
        <Link to="/" className="text-blue-600 underline">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
