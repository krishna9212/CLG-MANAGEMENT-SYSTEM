import React, { useState, useEffect } from "react";

// Simulated fetch function for subjects (replace with real database calls as needed)
const fetchSubjectsFromDatabase = () => {
  return [
    {
      totalMarks: 100,
      obtainedMarks: 85,
      semester: "1st Sem",
    },
    {
      totalMarks: 100,
      obtainedMarks: 72,
      semester: "1st Sem",
    },
    {
      totalMarks: 100,
      obtainedMarks: 65,
      semester: "1st Sem",
    },
    {
      totalMarks: 100,
      obtainedMarks: 55,
      semester: "1st Sem",
    },
    {
      totalMarks: 100,
      obtainedMarks: 90,
      semester: "1st Sem",
    },
  ];
};

// Simulated user data
const getUserRole = () => {
  return {
    role: "teacher", // Change to "teacher" to test teacher view
    name: "John Doe",
  };
};

// Deep clone function to avoid shallow copies
const deepClone = (data) => {
  return JSON.parse(JSON.stringify(data));
};

// Student Marks Component
const StudentMarks = ({ marksData }) => {
  return (
    <div className="min-h-[60%] text-xs bg-white w-full  rounded-xl  overflow-auto">
      <h1 className="text-center text-2xl font-bold mb-6">Your Marks</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border">Semester</th>
            <th className="border">Total Marks</th>
            <th className="border">Obtained Marks</th>
            <th className="border">Percentage</th>
            <th className="border">Status</th>
          </tr>
        </thead>
        <tbody>
          {marksData.map((data, index) => (
            <tr key={index} className="text-center">
              <td className="border ">{data.semester}</td>
              <td className="border ">{data.totalMarks}</td>
              <td className="border ">{data.obtainedMarks}</td>
              <td className="border ">
                {((data.obtainedMarks / data.totalMarks) * 100).toFixed(2)}%
              </td>
              <td
                className={`border ${
                  (data.obtainedMarks / data.totalMarks) * 100 >= 50
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {(data.obtainedMarks / data.totalMarks) * 100 >= 50
                  ? "Pass"
                  : "Fail"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Teacher Marks Component
const TeacherMarks = ({ marksData, setMarksData }) => {
  const [tempData, setTempData] = useState(deepClone(marksData));
  const [newMark, setNewMark] = useState({
    semester: "",
    totalMarks: "",
    obtainedMarks: "",
  });

  useEffect(() => {
    setTempData(deepClone(marksData));
  }, [marksData]);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...tempData];
    updatedData[index][field] = value >= 0 ? Number(value) : 0;
    setTempData(updatedData);
  };

  const handleConfirm = (index) => {
    const updatedMarks = [...marksData];
    updatedMarks[index] = { ...tempData[index] };
    setMarksData(updatedMarks);
  };

  const handleCancel = (index) => {
    const revertedData = deepClone(marksData);
    setTempData(revertedData);
  };

  const handleAddMark = (e) => {
    e.preventDefault();
    if (
      newMark.semester &&
      newMark.totalMarks > 0 &&
      newMark.obtainedMarks >= 0
    ) {
      const updatedMarks = [
        ...marksData,
        {
          semester: newMark.semester,
          totalMarks: Number(newMark.totalMarks),
          obtainedMarks: Number(newMark.obtainedMarks),
        },
      ];
      setMarksData(updatedMarks);
      setNewMark({
        semester: "",
        totalMarks: "",
        obtainedMarks: "",
      });
    } else {
      alert("Please fill all fields correctly.");
    }
  };

  return (
    <div className="min-h-[60%] bg-white w-full text-xs rounded-xl  overflow-auto">
      <h1 className="text-center text-2xl font-bold mb-6">
        Manage Student Marks
      </h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border ">Semester</th>
            <th className="border ">Total Marks</th>
            <th className="border ">Obtained Marks</th>
            <th className="border ">Percentage</th>
            <th className="border ">Status</th>
            <th className="border ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tempData.map((data, index) => (
            <tr key={index} className="text-center">
              <td className="border">
                <input
                  type="text"
                  value={data.semester}
                  onChange={(e) =>
                    handleInputChange(index, "semester", e.target.value)
                  }
                  className="w-full rounded-md"
                />
              </td>

              <td className="border ">
                <input
                  type="number"
                  value={data.totalMarks}
                  onChange={(e) =>
                    handleInputChange(index, "totalMarks", e.target.value)
                  }
                  min="0"
                  className="w-full p-1 rounded-md"
                />
              </td>
              <td className="border ">
                <input
                  type="number"
                  value={data.obtainedMarks}
                  onChange={(e) =>
                    handleInputChange(index, "obtainedMarks", e.target.value)
                  }
                  min="0"
                  className="w-full p-1 rounded-md"
                />
              </td>
              <td className="border ">
                {data.totalMarks > 0
                  ? `${((data.obtainedMarks / data.totalMarks) * 100).toFixed(
                      2
                    )}%`
                  : "N/A"}
              </td>
              <td
                className={`border ${
                  data.totalMarks > 0 &&
                  (data.obtainedMarks / data.totalMarks) * 100 >= 35
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {data.totalMarks > 0
                  ? (data.obtainedMarks / data.totalMarks) * 100 >= 35
                    ? "Pass"
                    : "Fail"
                  : "N/A"}
              </td>
              <td className="border flex  flex-col md:flex-row gap-1">
                <button
                  className="bg-green-500 text-white p-[0.1rem] md:p-1  rounded "
                  onClick={() => handleConfirm(index)}
                >
                  Confirm
                </button>
                <button
                  className="bg-red-500 text-white p-[0.1rem] md:p-1  rounded flex "
                  onClick={() => handleCancel(index)}
                >
                  Cancel <p className="inline text-transparent">.</p>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form to Add New Marks */}
      <div className="my-6">
        <h2 className="text-xl font-semibold mb-4">Add New Marks</h2>
        <form
          onSubmit={handleAddMark}
          className="flex flex-col md:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="Semester"
            value={newMark.semester}
            onChange={(e) =>
              setNewMark({ ...newMark, semester: e.target.value })
            }
            className="border p-2 rounded-md w-full md:w-1/4"
            required
          />

          <input
            type="number"
            placeholder="Total Marks"
            value={newMark.totalMarks}
            onChange={(e) =>
              setNewMark({ ...newMark, totalMarks: e.target.value })
            }
            min="0"
            className="border p-2 rounded-md w-full md:w-1/4"
            required
          />
          <input
            type="number"
            placeholder="Obtained Marks"
            value={newMark.obtainedMarks}
            onChange={(e) =>
              setNewMark({ ...newMark, obtainedMarks: e.target.value })
            }
            min="0"
            className="border p-2 rounded-md w-full md:w-1/4"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-1 rounded-md"
          >
            Add Mark
          </button>
        </form>
      </div>
    </div>
  );
};

// Main Marks Component
const Marks = () => {
  const [marksData, setMarksData] = useState([]);
  const [userRole, setUserRole] = useState("teacher"); // Default role can be "teacher" or "student"

  useEffect(() => {
    const user = getUserRole();
    setUserRole(user.role);

    const marks = fetchSubjectsFromDatabase();
    setMarksData(marks);
  }, []);

  return (
    <div className="min-h-[60%] w-full flex flex-col gap-8 ">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl">Marks Management System</h1>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            className={`px-4 py-2 rounded-md ${
              userRole === "student"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setUserRole("student")}
          >
            Student View
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              userRole === "teacher"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setUserRole("teacher")}
          >
            Teacher View
          </button>
        </div>
      </div>

      {userRole === "student" ? (
        <StudentMarks marksData={marksData} />
      ) : (
        <TeacherMarks marksData={marksData} setMarksData={setMarksData} />
      )}
    </div>
  );
};

export default Marks;
