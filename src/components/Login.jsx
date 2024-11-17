// src/components/Login.js
import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link

const Login = () => {
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Add your login logic here (e.g., fetch to your backend)
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      console.log(data.message); // Handle successful login (e.g., redirect, display message)
      history.push("/dashboard"); // Redirect after successful login
    } catch (error) {
      console.error("Login failed:", error.message);
      // Optionally set an error message in state to display on the UI
    }
  };

  return (
    <div className="bg-[#f6f8e0] min-h-screen md:h-screen flex md:flex-row flex-col">
      <div className="left h-[35%] md:h-full w-full md:w-[65%] flex-col justify-center items-center p-10">
        <h1 className="h-[40%] md:h-[40%] w-full flex md:items-end md:pt-0 text-5xl font-medium md:text-9xl pb-5">
          Login
        </h1>
        <h1 className="h-[60%] md:h-[40%] w-[100%] uppercase pt-2 text-2xl md:text-5xl font-normal md:pt-6">
          to College Management System
        </h1>
      </div>

      <div className="right h-[60%] py-5 md:py-0 md:h-full w-full md:w-[35%] flex items-center justify-center border-black border-t-[1px] md:border-t-0 border-dashed">
        <div className="box bg-white shadow-xl w-[80%] h-max-[80%] rounded-2xl overflow-hidden p-4">
          <form
            onSubmit={handleLogin}
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
              type="email"
              placeholder="Enter Email Id"
              name="Email"
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
            <button
              type="submit"
              className="bg-black text-white w-full p-4 rounded-md capitalize"
            >
              Log In
            </button>

            <div className="lines h-[1%] w-full mt-1 flex gap-1 items-center justify-around">
              <div className="line h-[0.07px] w-[40%] bg-gray-600 opacity-75"></div>
              <p>or</p>
              <div className="line h-[0.07px] w-[40%] bg-gray-600 opacity-75"></div>
            </div>
            <p className="md:p-3">
              Don't have an account?
              <Link to="/register" className="text-blue-600 p-1">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
