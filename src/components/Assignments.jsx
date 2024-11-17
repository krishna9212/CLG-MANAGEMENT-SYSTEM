import React, { useState } from "react";
import image1 from "./../assets/logo_1 (1).png";

// AssignmentCard Component
const AssignmentCard = ({
  title,
  description,
  timing,
  fileUrl,
  onDelete,
  isTeacher,
}) => {
  return (
    <div className="box p-5 h-[40%] min-h-[225px] bg-blue-800 text-white flex-shrink-0 rounded-2xl overflow-hidden relative">
      {/* Delete button for teacher */}
      {isTeacher && (
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white p-1 rounded"
        >
          Delete
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
          {/* Conditionally render the link based on fileUrl */}
          {fileUrl ? (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-700 underline"
            >
              View Document
            </a>
          ) : null}{" "}
          {/* Render nothing if fileUrl is not provided */}
        </div>
      </div>
      <p className="bold text-right pb-2 text-sm font-medium">{timing}</p>
    </div>
  );
};

// TeacherForm Component
const TeacherForm = ({ addAssignment }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timing, setTiming] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a FormData object to send the file and other details
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("timing", timing);
    formData.append("file", file); // Append the file

    // Only create a URL for image types; for other files, use the original URL
    const fileUrl =
      file && file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : URL.createObjectURL(new Blob([file]));

    addAssignment({
      title,
      description,
      timing,
      file: fileUrl, // Update assignment with file URL
    });
    setTitle("");
    setDescription("");
    setTiming("");
    setFile(null); // Reset file
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
      <input
        type="text"
        placeholder="Assignment Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 rounded"
        required
      />
      <textarea
        placeholder="Assignment Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 rounded"
        required
      />
      <input
        type="date"
        placeholder="Due Date (e.g., Oct 15, 2024)"
        value={timing}
        onChange={(e) => setTiming(e.target.value)}
        className="p-2 rounded"
        required
      />
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png" // Accept PDF and image files
        onChange={handleFileChange}
        className="p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
        Add Assignment
      </button>
    </form>
  );
};

// Main Assignments Component
function Assignments() {
  const [role, setRole] = useState("student"); // "student" or "teacher"
  const [assignments, setAssignments] = useState([]);

  // Function to add a new assignment
  const addAssignment = (assignment) => {
    setAssignments([...assignments, assignment]);
  };

  // Function to delete an assignment by index
  const deleteAssignment = (index) => {
    setAssignments(assignments.filter((_, i) => i !== index));
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

      {/* Student and Teacher Common View - Assignment List */}
      <div className="h-full w-full flex flex-col gap-4">
        <div className="text-lg font-semibold mt-4">Existing Assignments</div>
        {assignments.map((assignment, index) => (
          <AssignmentCard
            key={index}
            title={assignment.title}
            description={assignment.description}
            timing={assignment.timing}
            fileUrl={assignment.file} // Pass the file URL to display in card
            onDelete={() => deleteAssignment(index)} // Pass delete function to the card
            isTeacher={role === "teacher"} // Show delete button only if teacher
          />
        ))}
        {/* Teacher View */}
        {role === "teacher" && <TeacherForm addAssignment={addAssignment} />}
      </div>
    </div>
  );
}

export default Assignments;
