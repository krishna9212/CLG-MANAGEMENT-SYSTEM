import React, { useState, useEffect } from "react";

// Simulated fetch function for subjects (this would be replaced by a real database call later)
const fetchSubjectsFromDatabase = () => {
  return [
    { subject: "Math", totalClasses: 40, attendedClasses: 35 },
    { subject: "Science", totalClasses: 30, attendedClasses: 28 },
    { subject: "History", totalClasses: 25, attendedClasses: 20 },
    { subject: "Geography", totalClasses: 20, attendedClasses: 15 },
    { subject: "English", totalClasses: 50, attendedClasses: 45 },
  ];
};

// Simulated user data
const getUserRole = () => {
  return {
    role: "student", // "teacher" or "student"
    name: "John Doe",
  };
};

// Deep clone function to avoid shallow copies
const deepClone = (data) => {
  return JSON.parse(JSON.stringify(data));
};

// Student Attendance Component
const StudentAttendance = ({ attendanceData }) => {
  return (
    <div>
      <table
        className="w-full min-w-full text-sm md:text-base border-collapse"
        style={{ border: "1px solid #ddd", width: "100%", overflowX: "auto" }}
      >
        <thead>
          <tr>
            <th>S.No</th>
            <th>Subject</th>
            <th>Total Classes</th>
            <th>Attended Classes</th>
            <th>Pass/Fail</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.subject}</td>
              <td>{data.totalClasses}</td>
              <td>{data.attendedClasses}</td>
              <td
                style={{
                  color:
                    data.totalClasses === 0
                      ? "black"
                      : (data.attendedClasses / data.totalClasses) * 100 >= 75
                      ? "green"
                      : "red",
                }}
              >
                {data.totalClasses === 0
                  ? "N/A"
                  : (data.attendedClasses / data.totalClasses) * 100 >= 75
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

// Teacher Attendance Component
const TeacherAttendance = ({ attendanceData, setAttendanceData }) => {
  const [tempData, setTempData] = useState(deepClone(attendanceData));

  useEffect(() => {
    setTempData(deepClone(attendanceData));
  }, [attendanceData]);

  const handleInputChange = (index, field, value) => {
    const newData = [...tempData];
    newData[index][field] = Math.max(0, value);
    setTempData(newData);
  };

  const handleConfirm = (index) => {
    const newData = [...attendanceData];
    newData[index] = tempData[index];
    setAttendanceData(newData);
  };

  const handleCancel = (index) => {
    const newTempData = deepClone(attendanceData);
    setTempData(newTempData);
  };

  return (
    <div>
      <table
        className="min-w-full text-xs md:text-base border-collapse"
        style={{ border: "1px solid #ddd", width: "100%", overflowX: "auto" }}
      >
        <thead>
          <tr>
            <th>S.No</th>
            <th>Subject</th>
            <th>Total Classes</th>
            <th>Attended Classes</th>
            <th>Pass/Fail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tempData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.subject}</td>
              <td>
                <input
                  type="number"
                  className="rounded-xl p-1 w-full"
                  value={data.totalClasses}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "totalClasses",
                      parseInt(e.target.value)
                    )
                  }
                  min="0"
                />
              </td>
              <td>
                <input
                  type="number"
                  className="rounded-xl p-1 w-full"
                  value={data.attendedClasses}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "attendedClasses",
                      parseInt(e.target.value)
                    )
                  }
                  min="0"
                />
              </td>
              <td
                style={{
                  color:
                    data.totalClasses === 0
                      ? "black"
                      : (data.attendedClasses / data.totalClasses) * 100 >= 75
                      ? "green"
                      : "red",
                }}
              >
                {data.totalClasses === 0
                  ? "N/A"
                  : (data.attendedClasses / data.totalClasses) * 100 >= 75
                  ? "Pass"
                  : "Fail"}
              </td>
              <td>
                <button
                  className="bg-green-600 text-white p-1 md:p-2 m-1 rounded-lg"
                  onClick={() => handleConfirm(index)}
                >
                  Confirm
                </button>
                <button
                  className="bg-red-600 text-white p-1 md:p-2 rounded-lg"
                  onClick={() => handleCancel(index)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main Attendance Component
const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [userRole, setUserRole] = useState("teacher");

  useEffect(() => {
    const user = getUserRole();
    setUserRole(user.role);

    const subjects = fetchSubjectsFromDatabase();
    setAttendanceData(subjects);
  }, []);

  return (
    <div className="h-min-[60%] w-full flex  flex-col gap-8 ">
      <div>
        <h1 className="text-2xl ">Attendance System</h1>

        <div className="role-selector md:pb-5 pb-2 flex items-center text-xs gap-1 flex-wrap">
          <button
            className="bg-black text-white rounded-xl  p-2 "
            onClick={() => setUserRole("student")}
          >
            Switch to Student View
          </button>
          <button
            className="bg-black text-white rounded-xl p-2"
            onClick={() => setUserRole("teacher")}
          >
            Switch to Teacher View
          </button>
        </div>

        {userRole === "student" ? (
          <StudentAttendance attendanceData={attendanceData} />
        ) : (
          <TeacherAttendance
            attendanceData={attendanceData}
            setAttendanceData={setAttendanceData}
          />
        )}
      </div>
    </div>
  );
};

export default Attendance;
