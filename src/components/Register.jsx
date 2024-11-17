// src/components/Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link along with useNavigate

const Register = () => {
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, userType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      console.log(data.message); // Handle successful registration

      // Redirect to the login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.message);
      setError(error.message); // Set error message to state for UI display
    }
  };

  return (
    <div className="bg-[#f6f8e0] min-h-screen md:h-screen flex md:flex-row flex-col">
      <div className="left h-[35%] md:h-full w-full md:w-[65%] flex-col justify-center items-center p-10">
        <h1 className="h-[40%] md:h-[40%] w-full flex md:items-end md:pt-0 text-5xl font-medium md:text-9xl pb-5">
          Register
        </h1>
        <h1 className="h-[60%] md:h-[40%] w-[100%] uppercase pt-2 text-2xl md:text-5xl font-normal md:pt-6">
          to College Management System
        </h1>
      </div>

      <div className="right h-[60%] py-5 md:py-0 md:h-full w-full md:w-[35%] flex items-center justify-center border-black border-t-[1px] md:border-t-0 border-dashed">
        <div className="box bg-white shadow-xl w-[80%] h-max-[80%] rounded-2xl overflow-hidden p-4">
          <form
            onSubmit={handleRegister}
            className="flex flex-col items-center gap-4"
          >
            <select
              name="userTypes"
              id="user"
              className="p-4 w-full text-gray-400 rounded-md capitalize outline-1 outline-gray-200 bg-gray-100"
              required
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="">Select your user type</option>
              <option value="teacher">Teacher</option>
              <option value="first_year_student">First Year Student</option>
              <option value="second_year_student">Second Year Student</option>
              <option value="third_year_student">Third Year Student</option>
            </select>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              className="p-4 w-full rounded-md capitalize outline-1 outline-gray-200 bg-gray-100"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter Email Id"
              name="email" // Changed to lowercase for consistency
              className="p-4 w-full rounded-md capitalize outline-1 outline-gray-200 bg-gray-100"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              id="password"
              className="p-4 w-full rounded-md capitalize outline-1 outline-gray-200 bg-gray-100"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              className="p-4 w-full rounded-md capitalize outline-1 outline-gray-200 bg-gray-100"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}{" "}
            {/* Display error message */}
            <button
              type="submit"
              className="bg-black text-white w-full p-4 rounded-md capitalize"
            >
              Register
            </button>
            <div className="lines h-[1%] w-full mt-1 flex gap-1 items-center justify-around">
              <div className="line h-[0.07px] w-[40%] bg-gray-600 opacity-75"></div>
              <p>or</p>
              <div className="line h-[0.07px] w-[40%] bg-gray-600 opacity-75"></div>
            </div>
            <p className="md:p-3">
              Already have an account?
              <Link to="/" className="text-blue-600 p-1">
                Log In
              </Link>
              {/* Changed to Link */}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
