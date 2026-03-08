const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const SECRET_KEY = "campus_portal_secret";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "campus_portal"
});

db.connect((err) => {
  if (err) console.error("DB Error:", err);
  else console.log("Connected to MySQL");
});

// ================== STUDENT REGISTER ===================
app.post("/api/register", async (req, res) => {
  const { full_name, email, password, enrollment_no, course, branch, passing_year } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `INSERT INTO users (full_name,email,password,role,rgpv_enrollment_no,course,branch,batch_year)
               VALUES (?,?,?,?,?,?,?,?)`;
  db.query(sql, [full_name,email,hashedPassword,'student',enrollment_no,course,branch,passing_year], 
  (err, result) => {
    if(err) return res.status(400).json({ message: err.sqlMessage });
    res.json({ message: "Student Registered Successfully" });
  });
});

// ================== LOGIN ===================
app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body;
  const sql = "SELECT * FROM users WHERE email=? AND role=?";
  db.query(sql, [email, role], async (err, results) => {
    if(err) return res.status(500).json({ message: err });
    if(results.length === 0) return res.status(404).json({ message: "User not found" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id, role: user.role, department_id: user.department_id }, SECRET_KEY, { expiresIn: "8h" });
    res.json({ message: "Login Successful", token, role: user.role, department_id: user.department_id, user });
  });
});

// ================== GET STUDENTS ===================
app.get("/students", (req, res) => {
  const { role, department_id } = req.query;
  let sql = "";
  let params = [];

  if(role === 'department') {
    sql = "SELECT id, full_name, email, rgpv_enrollment_no, course, branch, batch_year FROM users WHERE role='student' AND department_id=?";
    params.push(department_id);
  } else if(role === 'cdc' || role === 'fee') {
    sql = "SELECT id, full_name, email, rgpv_enrollment_no, course, branch, batch_year, department_id FROM users WHERE role='student'";
  } else {
    return res.status(403).json({ error: "Not authorized" });
  }

  db.query(sql, params, (err, results) => {
    if(err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ================== DEBUG: GET TABLE COLUMNS ===================
app.get("/api/debug/columns", (req, res) => {
  db.query("DESCRIBE student_info", (err, results) => {
    if(err) return res.status(400).json({ error: err.sqlMessage });
    res.json(results);
  });
});

// ================== STUDENT SUBMIT INFO ===================
app.post("/api/student/submit-info", (req, res) => {
  const data = req.body;
  
  if (!data.user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }
  
  // First get table columns to match
  db.query("DESCRIBE student_info", (err, columns) => {
    if (err) return res.status(400).json({ error: "Cannot get table structure: " + err.sqlMessage });
    
    console.log("Table has", columns.length, "columns");
    const columnNames = columns.map(c => c.Field);
    console.log("Columns:", columnNames.join(", "));
    
    // Check existing
    const checkSql = "SELECT id FROM student_info WHERE user_id = ?";
    db.query(checkSql, [data.user_id], (err, results) => {
      if (err) return res.status(400).json({ error: err.sqlMessage });
      
      // Build dynamic insert based on actual columns
      const insertColumns = columnNames.filter(c => c !== 'id' && c !== 'created_at' && c !== 'updated_at');
      const placeholders = insertColumns.map(() => '?').join(',');
      const insertSql = `INSERT INTO student_info (${insertColumns.join(',')}) VALUES (${placeholders})`;
      
      // Build values array
      const values = insertColumns.map(col => {
        if(col === 'user_id') return data.user_id;
        if(col === 'status') return 'pending';
        if(col === 'department_id') return data.department_id || null;
        if(col.startsWith('skill_')) return data[col] ? 1 : 0;
        return data[col] || null;
      });
      
      console.log("Insert SQL columns:", insertColumns.length);
      console.log("Insert values:", values.length);
      
      db.query(insertSql, values, (err, result) => {
        if (err) {
          console.error("Insert error:", err.sqlMessage);
          return res.status(400).json({ error: err.sqlMessage });
        }
        res.json({ message: "Form submitted successfully!", status: "pending" });
      });
    });
  });
});

// ================== GET STUDENT INFO ===================
app.get("/api/student/info/:user_id", (req, res) => {
  const sql = "SELECT * FROM student_info WHERE user_id = ?";
  db.query(sql, [req.params.user_id], (err, result) => {
    if (err) return res.status(400).json({ error: err.sqlMessage });
    if (result.length === 0) return res.json({ message: "No information submitted yet", data: null });
    res.json(result[0]);
  });
});

// ================== DEPARTMENT VIEW PENDING FORMS ===================
app.get("/api/department/forms/:department_id", (req, res) => {
  const sql = `SELECT si.*, u.full_name as student_name, u.email as student_email 
               FROM student_info si 
               JOIN users u ON si.user_id = u.id 
               WHERE si.department_id = ? AND si.status = 'pending'
               ORDER BY si.created_at DESC`;
  db.query(sql, [req.params.department_id], (err, result) => {
    if (err) return res.status(400).json({ error: err.sqlMessage });
    res.json(result);
  });
});

// ================== DEPARTMENT VERIFY/REJECT ===================
app.post("/api/department/action", (req, res) => {
  const { student_info_id, action } = req.body;
  if (!['verified', 'rejected'].includes(action)) {
    return res.status(400).json({ error: "Invalid action" });
  }
  const sql = "UPDATE student_info SET status = ? WHERE id = ?";
  db.query(sql, [action, student_info_id], (err, result) => {
    if (err) return res.status(400).json({ error: err.sqlMessage });
    res.json({ message: `Form ${action} successfully` });
  });
});

// ================== CDC VIEW ALL STUDENTS ===================
app.get("/api/cdc/forms", (req, res) => {
  const sql = `SELECT si.*, u.full_name as student_name, u.email as student_email, 
               d.name as department_name 
               FROM student_info si
               JOIN users u ON si.user_id = u.id
               LEFT JOIN departments d ON si.department_id = d.id
               ORDER BY si.created_at DESC`;
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json({ error: err.sqlMessage });
    res.json(result);
  });
});

// ================== CDC VIEW STUDENT DETAILS ===================
app.get("/api/cdc/student/:id", (req, res) => {
  const sql = `SELECT si.*, u.full_name as student_name, u.email as student_email,
               d.name as department_name
               FROM student_info si
               JOIN users u ON si.user_id = u.id
               LEFT JOIN departments d ON si.department_id = d.id
               WHERE si.id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(400).json({ error: err.sqlMessage });
    if (result.length === 0) return res.status(404).json({ error: "Student not found" });
    res.json(result[0]);
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

