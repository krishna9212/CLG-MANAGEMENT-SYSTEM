import React, { useState } from "react";
import image1 from "./../assets/logo_1 (1).png";

// NoticeCard Component
const NoticeCard = ({ title, description, timing, onDelete, isTeacher }) => {
  return (
    <div className="box p-5 h-[40%] min-h-[225px] bg-blue-800 text-white flex-shrink-0 rounded-2xl overflow-hidden relative">
      {/* Delete button for teacher */}
      {isTeacher && (
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 bg-red-500 px-2 py-1 hover:bg-red-700 text-white p-1 rounded"
        >
          X
        </button>
      )}
      <div className="upp h-[25%] w-full">
        <img
          src={image1}
          alt="document image"
          className="h-full h-max-[20%] w-full object-contain"
        />
      </div>
      <div className="downn h-[75%] w-full py-1 flex flex-col border-t-[1px] border-white">
        <div className="tooooooooooop h-[14%] w-full text-capitalize font-bold">
          <h1 className="border-b-[1px] p-1 border-white border-dashed inline">
            {title}
          </h1>
        </div>
        <div className="botton h-[84%] flex flex-col justify-between w-full pt-2">
          <p>{description}</p>
        </div>
      </div>
      <p className="bold text-right pb-2 text-sm font-medium">{timing}</p>
    </div>
  );
};

// TeacherForm Component for Notices
const TeacherForm = ({ addNotice }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timing, setTiming] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addNotice({ title, description, timing });
    setTitle("");
    setDescription("");
    setTiming("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
      <input
        type="text"
        placeholder="Notice Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 rounded"
        required
      />
      <textarea
        placeholder="Notice Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 rounded"
        required
      />
      <input
        type="date"
        placeholder="Date (e.g., Oct 15, 2024)"
        value={timing}
        onChange={(e) => setTiming(e.target.value)}
        className="p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
        Add Notice
      </button>
    </form>
  );
};

// Main Notices Component
function Notices() {
  const [role, setRole] = useState("student"); // "student" or "teacher"
  const [notices, setNotices] = useState([]);

  // Function to add a new notice
  const addNotice = (notice) => {
    setNotices([...notices, notice]);
  };

  // Function to delete a notice by index
  const deleteNotice = (index) => {
    setNotices(notices.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full w-full flex flex-col gap-4 rounded-xl p-2 overflow-y-auto">
      {/* Role Switcher */}
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={() => setRole("student")}
          className={`p-2 rounded ${
            role === "student" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Student
        </button>
        <button
          onClick={() => setRole("teacher")}
          className={`p-2 rounded ${
            role === "teacher" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Teacher
        </button>
      </div>

      {/* Student and Teacher Common View - Notice List */}
      <div className="h-full w-full flex flex-col gap-4">
        <div className="text-lg font-semibold mt-4">Existing Notices</div>
        {notices.map((notice, index) => (
          <NoticeCard
            key={index}
            title={notice.title}
            description={notice.description}
            timing={notice.timing}
            onDelete={() => deleteNotice(index)} // Pass delete function to the card
            isTeacher={role === "teacher"} // Show delete button only if teacher
          />
        ))}
        {/* Teacher View */}
        {role === "teacher" && <TeacherForm addNotice={addNotice} />}
      </div>
    </div>
  );
}

export default Notices;
