import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "./../assets/logo_1 (1).png";
import "./../app.css";

function Home() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference for the menu box

  const handleLogout = () => {
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    // Check if the click is outside the menu container
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false); // Close the menu
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside); // Add event listener when menu is open
    } else {
      document.removeEventListener("mousedown", handleClickOutside); // Remove event listener when menu is closed
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup the event listener
    };
  }, [isMenuOpen]);

  return (
    <div className="home bg-black h-screen w-screen p-2 flex flex-col md:flex-row gap-2">
      {/* Left Sidebar */}
      <div className="left h-[10%] md:h-full p-0 md:p-5 w-full md:w-[30%] rounded-xl bg-white justify-between flex flex-row md:flex-col items-center">
        <div className="logo h-full md:h-[30%] w-full flex justify-center items-center">
          <img
            src={logo}
            alt="logo kiras"
            className="h-full w-full md:h-[50%] mt-0 md:mt-20 object-contain"
          />
        </div>
        <div className="box capitalize flex flex-col items-end mr-4 md:items-center mt-0 md:mt-10 h-[70%] w-full relative">
          {/* Menu Icon (visible only on mobile) */}
          <button
            onClick={toggleMenu}
            className="md:hidden  bg-black text-white p-3  rounded-full  mb-5"
          >
            Menu
          </button>

          {/* Links Container (visible only on mobile when menu is open) */}
          <div
            ref={menuRef} // Ref added to the menu container
            className={`innerbox  flex flex-col gap-3  w-[100%] mt-1 bg-gray-900 p-8 rounded-xl transition-opacity duration-300 ease-in-out md:hidden ${
              isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Link to="/home" className="outline-none text-white">
              Home
            </Link>
            <Link to="attendance" className="outline-none text-white">
              Attendance
            </Link>
            <Link to="marks" className="outline-none text-white">
              Marks
            </Link>
            <Link to="assignments" className="outline-none text-white">
              Assignments
            </Link>
            <Link to="notices" className="outline-none text-white">
              Notices
            </Link>
          </div>

          {/* Desktop Links (visible only on larger screens) */}
          <div className="hidden md:flex flex-col items-center gap-3 w-[80%]">
            <div className="innnerBox md:flex flex-col gap-3">
              <Link to="/home" className="outline-none text-black">
                Home
              </Link>
              <Link to="attendance" className="outline-none text-black">
                Attendance
              </Link>
              <Link to="marks" className="outline-none text-black">
                Marks
              </Link>
              <Link to="assignments" className="outline-none text-black">
                Assignments
              </Link>
              <Link to="notices" className="outline-none text-black">
                Notices
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Right Content Area */}
      <div className="right h-full overflow-auto w-full md:w-[70%] rounded-xl bg-white flex flex-col">
        <div className="top h-[15%] md:h-[7%]  border-b-[0.8px]  border-black flex md:justify-end justify-center items-center md:items-end md:px-3 w-full">
          <div className="profile font-semibold  text-lg md:text-xl capitalize">
            <h1>
              Hi Krishna!!{" "}
              <span className="font-normal capitalize text-base md:text-lg">
                Welcome to college management system
              </span>
            </h1>
          </div>
        </div>

        <div className="bottom h-[93%] w-full flex-col gap-5 p-2">
          {/* Dynamically load the component based on the route */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
