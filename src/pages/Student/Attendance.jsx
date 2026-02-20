import { useState } from "react";

export default function AttendancePage() {
  const [tab, setTab] = useState("mark");

  const [sessionCode, setSessionCode] = useState("");
  const [studentNo, setStudentNo] = useState("");

  const [myHistory, setMyHistory] = useState([]);

  // Department records (Admin controlled)
  const [deptHistory, setDeptHistory] = useState([]);

  // ===== STUDENT SUBMIT =====
  const submitAttendance = (e) => {
    e.preventDefault();
    if (!sessionCode || !studentNo) return;

    const record = {
      student: studentNo,
      code: sessionCode,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    // Only My History update
    setMyHistory([record, ...myHistory]);

    setSessionCode("");
    setStudentNo("");
    setTab("my");
  };

  // ===== ADMIN ADD (Department Controlled Demo) =====
  const addDeptRecord = () => {
    const rec = {
      student: Math.floor(Math.random() * 50),
      code: "DEPT" + Math.floor(Math.random() * 999),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    setDeptHistory([rec, ...deptHistory]);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-4">Attendance</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        <Tab name="mark" tab={tab} setTab={setTab}>Mark Attendance</Tab>
        <Tab name="my" tab={tab} setTab={setTab}>My History</Tab>
        <Tab name="dept" tab={tab} setTab={setTab}>Department History</Tab>
      </div>

      {/* MARK */}
      {tab === "mark" && (
        <div className="flex justify-center">
          <form
            onSubmit={submitAttendance}
            className="bg-white w-[420px] p-8 rounded-2xl shadow border"
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Mark Attendance
            </h2>

            <input
              value={sessionCode}
              onChange={(e) => setSessionCode(e.target.value)}
              placeholder="Session Code"
              className="w-full border p-2 rounded mb-4"
            />

            <input
              value={studentNo}
              onChange={(e) => setStudentNo(e.target.value)}
              placeholder="Student Number"
              className="w-full border p-2 rounded mb-6"
            />

            <button className="w-full bg-black text-white py-3 rounded-xl">
              Submit Attendance
            </button>
          </form>
        </div>
      )}

      {/* MY HISTORY */}
      {tab === "my" && <History title="My History" data={myHistory} />}

      {/* DEPARTMENT HISTORY */}
      {tab === "dept" && (
        <DeptHistory data={deptHistory} addDeptRecord={addDeptRecord} />
      )}
    </div>
  );
}


// ===== TAB BUTTON =====
function Tab({ name, tab, setTab, children }) {
  return (
    <button
      onClick={() => setTab(name)}
      className={`px-4 py-2 rounded-xl border ${
        tab === name ? "bg-white shadow" : "bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}


// ===== MY HISTORY TABLE =====
function History({ title, data }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow border">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th>Session</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-8 text-gray-400">
                No records found
              </td>
            </tr>
          ) : (
            data.map((r, i) => (
              <tr key={i} className="border-b">
                <td>{r.code}</td>
                <td>{r.date}</td>
                <td>{r.time}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}


// ===== DEPARTMENT HISTORY =====
function DeptHistory({ data, addDeptRecord }) {

  const totalClasses = new Set(data.map((d) => d.code)).size;

  const studentStats = {};
  data.forEach((r) => {
    if (!studentStats[r.student]) studentStats[r.student] = 0;
    studentStats[r.student]++;
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow border">

      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Department History</h2>

        {/* DEMO ADMIN BUTTON */}
        <button
          onClick={addDeptRecord}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          + Add Dept Record
        </button>
      </div>

      {/* SUMMARY */}
      <div className="bg-gray-50 p-4 rounded mb-6 border">
        Total Classes : <b>{totalClasses}</b>

        {Object.keys(studentStats).map((s) => {
          const attended = studentStats[s];
          const percent =
            totalClasses === 0
              ? 0
              : ((attended / totalClasses) * 100).toFixed(1);

          return (
            <div key={s}>
              Student {s} — {attended} — {percent}%
            </div>
          );
        })}
      </div>

      {/* TABLE */}
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th>Student</th>
            <th>Session</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-8 text-gray-400">
                No records
              </td>
            </tr>
          ) : (
            data.map((r, i) => (
              <tr key={i} className="border-b">
                <td>{r.student}</td>
                <td>{r.code}</td>
                <td>{r.date}</td>
                <td>{r.time}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}