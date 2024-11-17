import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Attendance from "./components/Attendance";
import Marks from "./components/Marks";
import Assignments from "./components/Assignments";
import Notices from "./components/Notices";
import Login from "./components/Login"; // Assuming you have a login component
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />}>
          <Route path="attendance" element={<Attendance />} />
          <Route path="marks" element={<Marks />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="notices" element={<Notices />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
