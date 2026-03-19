const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const JWT_SECRET = process.env.JWT_SECRET || "campusflow_supersecret_2024_change_this_in_prod";

// JWT Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ error: 'Access token required' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// const mysql = require('mysql2'); // duplicate, already imported above
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'campus_portal'
});

db.connect((err) => {
  if (err) console.error("DB Error:", err);
  else console.log("Connected to MySQL");
});

// ================== STUDENT REGISTER ===================
app.post("/api/register", async (req, res) => {
  const { full_name, email, password, enrollment_no, course, branch, passing_year } = req.body;

  const checkSql = "SELECT id FROM users WHERE email = ? OR rgpv_enrollment_no = ?";
  const dbPromise = db.promise();
  try {
    const [checkResults] = await dbPromise.query(checkSql, [email, enrollment_no]);
    if (checkResults.length > 0) {
      return res.status(409).json({ message: 'Account with this email or RGPV enrollment already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users (full_name,email,password,role,rgpv_enrollment_no,course,branch,batch_year)
                 VALUES (?,?,?,?,?,?,?,?)`;
    await dbPromise.query(sql, [full_name, email, hashedPassword, 'student', enrollment_no, course, branch, passing_year]);
    res.json({ message: "Student Registered Successfully" });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: err.message || 'Registration failed' });
  }
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

    // Check if MFA enabled
    if (user.mfa_enabled) {
      const tempToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "5m" });
      res.json({ 
        message: "MFA required", 
        needs_mfa: true, 
        temp_token: tempToken, 
        role: user.role, 
        department_id: user.department_id,
        user: { id: user.id, mfa_enabled: true }
      });
    } else {
      const token = jwt.sign({ id: user.id, role: user.role, department_id: user.department_id }, JWT_SECRET, { expiresIn: "8h" });
      res.json({ message: "Login Successful", token, role: user.role, department_id: user.department_id, user });
    }
  });
});

// ================== MFA ROUTES ===================
// Setup MFA - Generate secret and QR
app.post("/api/mfa/setup", async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "userId required" });

  const sql = "SELECT id FROM users WHERE id = ?";
  db.query(sql, [userId], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "User not found" });

    const secret = speakeasy.generateSecret({
      name: `CampusFlow (${userId})`,
      issuer: "CampusFlow",
      length: 32
    });

    // Update DB
    const updateSql = "UPDATE users SET mfa_secret = ? WHERE id = ?";
    db.query(updateSql, [secret.base32, userId], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Generate QR data URL
      QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
        if (err) return res.status(500).json({ error: "QR generation failed" });
        res.json({ 
          secret: secret.base32,
          qr_data_url: data_url,
          otpauth_url: secret.otpauth_url,
          message: "Scan QR with Google Authenticator" 
        });
      });
    });
  });
});

// Verify OTP
app.post("/api/mfa/verify", (req, res) => {
  const { userId, token } = req.body;
  if (!userId || !token) return res.status(400).json({ error: "userId and token required" });

  const sql = "SELECT mfa_secret FROM users WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: "User not found" });

    const verified = speakeasy.totp.verify({
      secret: results[0].mfa_secret,
      encoding: 'base32',
      token,
      window: 3,
      epoch: Math.floor(Date.now() / 1000)
    });

    res.json({ verified });
  });
});

// Enable MFA
app.post("/api/mfa/enable", (req, res) => {
  const { userId } = req.body;
  const sql = "UPDATE users SET mfa_enabled = 1 WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "MFA enabled", affectedRows: result.affectedRows });
  });
});

// Disable MFA
app.post("/api/mfa/disable", (req, res) => {
  const { userId } = req.body;
  const sql = "UPDATE users SET mfa_enabled = 0, mfa_secret = NULL WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "MFA disabled", affectedRows: result.affectedRows });
  });
});

// Login with MFA verify
app.post("/api/mfa/login-verify", (req, res) => {
  const { temp_token, token: otp } = req.body;
  
  try {
    const decoded = jwt.verify(temp_token, JWT_SECRET);
    const userId = decoded.id;

    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [userId], (err, results) => {
      if (err || results.length === 0) return res.status(401).json({ error: "Invalid temp token" });

      const user = results[0];
      const verified = speakeasy.totp.verify({
        secret: user.mfa_secret,
        encoding: 'base32',
        token: otp,
        window: 3,
        epoch: Math.floor(Date.now() / 1000)
      });

      if (!verified) return res.status(401).json({ message: "Invalid OTP" });

      const fullToken = jwt.sign({ id: user.id, role: user.role, department_id: user.department_id }, JWT_SECRET, { expiresIn: "8h" });
      res.json({ message: "Login Successful", token: fullToken, role: user.role, department_id: user.department_id, user });
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired temp token" });
  }
});

// ================== GET STUDENTS ===================
app.get("/students", authenticateToken, (req, res) => {
  const role = req.user.role;
  const department_id = req.query.department_id;
  let sql = "";
  let params = [];

  if(role === 'department') {
    sql = "SELECT id, full_name, email, rgpv_enrollment_no, course, branch, batch_year FROM users WHERE role='student' AND department_id=?";
    params.push(department_id);
  } else if(role === 'cdc' || role === 'fee' || role === 'admin') {
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

// ================== DEPARTMENT VIEW ALL STUDENTS (with form status) ===================
app.get("/api/department/students/:department_id", (req, res) => {
  // Get ALL students from users table - with or without department assignment
  const sql = `SELECT 
                u.id as user_id,
                u.full_name,
                u.email as student_email,
                u.rgpv_enrollment_no as rgpv_enrollment,
                u.course,
                u.branch,
                u.batch_year,
                si.id as form_id,
                si.status as form_status,
                si.created_at as form_submitted_date
               FROM users u
               LEFT JOIN student_info si ON u.id = si.user_id
               WHERE u.role = 'student'
               ORDER BY u.full_name ASC`;
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json({ error: err.sqlMessage });
    res.json(result);
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

// ================== GET COMPLETE STUDENT PROFILE ==================
app.get("/api/student/profile/:user_id", authenticateToken, (req, res) => {
  const userId = req.params.user_id;
  if (req.user.id != userId && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized for this profile' });
  }
  
  // First get user basic info
  const userSql = "SELECT * FROM users WHERE id = ?";
  db.query(userSql, [userId], (err, userResults) => {
    if (err) return res.status(500).json({ error: err.message });
    if (userResults.length === 0) return res.status(404).json({ error: "User not found" });
    
    const user = userResults[0];
    
    // Then get student_info if exists
    const studentInfoSql = "SELECT * FROM student_info WHERE user_id = ?";
    db.query(studentInfoSql, [userId], (err, studentInfoResults) => {
      if (err) return res.status(500).json({ error: err.message });
      
      const studentInfo = studentInfoResults.length > 0 ? studentInfoResults[0] : null;
      
      // Combine data
      const profile = {
        ...user,
        student_info: studentInfo
      };
      
      res.json(profile);
    });
  });
});

// ================== GET STUDENT'S ATTENDANCE ==================
app.get("/api/student/attendance/:user_id", (req, res) => {
  const userId = req.params.user_id;
  
  // First get student_info id for this user
  const studentInfoSql = "SELECT id FROM student_info WHERE user_id = ?";
  db.query(studentInfoSql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.json({ 
        total_classes: 0, 
        present_classes: 0, 
        attendance_percentage: 0 
      });
    }
    
    const studentId = results[0].id;
    
    // Get attendance stats
    const attendanceSql = `
      SELECT 
        COUNT(a.id) AS total_classes,
        SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) AS present_classes,
        ROUND((SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) / COUNT(a.id)) * 100, 2) AS attendance_percentage
      FROM attendance a
      WHERE a.student_id = ?
    `;
    
    db.query(attendanceSql, [studentId], (err, attendanceResults) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(attendanceResults[0] || { 
        total_classes: 0, 
        present_classes: 0, 
        attendance_percentage: 0 
      });
    });
  });
});

// ================== GET STUDENT'S APPLICATION COUNT ==================
app.get("/api/student/applications/:user_id", (req, res) => {
  // For now, return a placeholder - this can be connected to actual applications table
  // when that functionality is implemented
  const userId = req.params.user_id;
  
  // Check if student has submitted info
  const sql = "SELECT id, status FROM student_info WHERE user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (results.length === 0) {
      return res.json({ 
        applications: 0, 
        form_submitted: false 
      });
    }
    
    res.json({ 
      applications: 0, 
      form_submitted: true,
      form_status: results[0].status
    });
  });
});

// ================== GET STUDENT ANALYTICS (NEW - Advanced Dashboard) ==================
app.get("/api/student/analytics/:user_id", (req, res) => {
  const userId = req.params.user_id;

  // 1. Get student_info for CGPA, skills, TC status
  db.query("SELECT cgpa, status as tc_status, skill_html, skill_css, skill_js, skill_react, skill_node, skill_python, skill_java, skill_sql FROM student_info WHERE user_id = ?", [userId], (err, siResults) => {
    if (err) return res.status(500).json({ error: err.message });
    if (siResults.length === 0) return res.json({ error: "No student info found", attendance: {}, analytics: {} });

    const si = siResults[0];
    const cgpa = parseFloat(si.cgpa) || 8.0;
    const skillsList = ['skill_html', 'skill_css', 'skill_js', 'skill_react', 'skill_node', 'skill_python', 'skill_java', 'skill_sql'];
    const skillsCount = skillsList.filter(skill => si[skill] === 1).length;

    // 2. Get attendance (reuse logic)
    db.query("SELECT id FROM student_info WHERE user_id = ?", [userId], (err, attIdResults) => {
      if (err) return res.status(500).json({ error: err.message });
      if (attIdResults.length === 0) {
        return res.json({
          attendance: { percentage: 0 },
          profile: {},
          analytics: {
            placement_score: 0,
            batch_att_avg: 75,
            batch_gpa_avg: 7.8,
            predictions: { next_gpa: cgpa + 0.1, placement_prob: 40 },
            tc_status: 'No form'
          }
        });
      }

      const studentInfoId = attIdResults[0].id;
      const attSql = `
        SELECT 
          COUNT(id) AS total_classes,
          SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) AS present_classes,
          ROUND((SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) / COUNT(id)) * 100, 2) AS percentage
        FROM attendance WHERE student_id = ?
      `;
      db.query(attSql, [studentInfoId], (err, attResults) => {
        if (err) return res.status(500).json({ error: err.message });

        const att = attResults[0] || { percentage: 0, total_classes: 0, present_classes: 0 };

        // 3. Get profile basics
        db.query("SELECT full_name, course, branch, batch_year FROM users WHERE id = ?", [userId], (err, profileResults) => {
          if (err) return res.status(500).json({ error: err.message });

          const profile = profileResults[0] || {};

          // Compute analytics
          const placementScore = Math.round((att.percentage * 0.4 + (cgpa / 10) * 0.4 + (skillsCount / 8) * 0.2) * 100);
          const batchComparison = {
            att_vs_avg: Math.round(att.percentage - 75),
            gpa_vs_avg: Math.round((cgpa - 7.8) * 10) / 10,
            percentile: Math.min(95, 50 + placementScore / 2)
          };
          const predictions = {
            next_gpa: Math.min(10, cgpa + 0.1),
            placement_prob: Math.round(35 + (placementScore / 100) * 65)
          };

          res.json({
            attendance: att,
            profile,
            student_info: { cgpa: cgpa.toFixed(1), skills_count: skillsCount },
            analytics: {
              placement_score: placementScore,
              batch_comparison: batchComparison,
              predictions,
              tc_status: si.tc_status || 'pending'
            }
          });
        });
      });
    });
  });
});

// ================== GENERATE TC PDF ===================
app.get("/api/generate-tc-pdf", (req, res) => {
  const { fullName, enrollment, course, year, reason } = req.query;
  
  const tcContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Transfer Certificate - CampusFlow</title>
  <style>
    body { font-family: 'Times New Roman', serif; max-width: 800px; margin: 0 auto; padding: 40px; line-height: 1.6; }
    .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #1e40af; padding-bottom: 20px; }
    .header h1 { color: #1e40af; font-size: 28px; margin: 0; }
    .header p { font-size: 18px; color: #374151; margin: 5px 0; }
    .cert-details { margin-bottom: 30px; }
    .cert-details p { margin: 12px 0; }
    .signature { margin-top: 80px; text-align: center; }
    .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="header">
    <h1>TRANSFER CERTIFICATE</h1>
    <p>Acropolis Institute of Technology & Research</p>
    <p>Indore, Madhya Pradesh</p>
  </div>
  
  <div class="cert-details">
    <p><strong>Certificate No:</strong> TC/${enrollment || 'XXXX'}/${year || 'YYYY'}</p>
    <p><strong>Admission No:</strong> ${enrollment || 'N/A'}</p>
    <p><strong>Date of Issue:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
    
    <p>This is to certify that <strong>${fullName || 'Student Name'}</strong>, a student of this Institute,</p>
    <p>was admitted to <strong>${course || 'B.Tech Computer Science'}</strong> with Enrollment No. <strong>${enrollment || 'N/A'}</strong>.</p>
    
    <p>The student has successfully completed the prescribed course of study and passed out in the year <strong>${year || '2024'}</strong>.</p>
    
    <p>Character & Conduct: <strong>Good</strong></p>
    <p>Reason for Leaving: <em>${reason || 'Completion of Course'}</em></p>
  </div>
  
  <div class="signature">
    <div style="margin-bottom: 60px;">
      <strong>_________________________</strong><br>
      <span style="font-size: 14px;">Principal</span>
    </div>
    <div>
      <strong>_________________________</strong><br>
      <span style="font-size: 14px;">Registrar</span>
    </div>
  </div>
  
  <div class="footer">
    Issued by CampusFlow Portal • Certificate generated on ${new Date().toLocaleString()}
  </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="TC_${enrollment || 'student'}_${new Date().toISOString().slice(0,10)}.pdf"`);
  
  // Frontend expects blob - send HTML (will be converted to PDF-like by browser)
  res.send(tcContent);
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});


// ================== GET ATTENDANCE (with full_name, rgpv_enrollment, total_classes, present_classes, attendance_percentage) ===================
app.get("/attendance", (req, res) => {
  const sql = `
    SELECT 
      u.full_name,
      s.rgpv_enrollment,
      COUNT(a.id) AS total_classes,
      SUM(a.status='Present') AS present_classes,
      ROUND((SUM(a.status='Present')/COUNT(a.id))*100,2) AS attendance_percentage
    FROM attendance a
    JOIN student_info s ON a.student_id = s.id
    JOIN users u ON s.user_id = u.id
    GROUP BY a.student_id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// ================== SAVE/UPDATE ATTENDANCE ===================
app.post("/attendance", (req, res) => {
  const { student_id, department_id, date, status, marked_by } = req.body;
  
  // Check if attendance already marked for this student on this date
  const checkSql = "SELECT id FROM attendance WHERE student_id = ? AND date = ?";
  db.query(checkSql, [student_id, date], (err, results) => {
    if (err) return res.status(400).json({ error: err.sqlMessage });
    
    if (results.length > 0) {
      // Update existing attendance
      const updateSql = "UPDATE attendance SET status = ?, marked_by = ? WHERE student_id = ? AND date = ?";
      db.query(updateSql, [status, marked_by, student_id, date], (err, result) => {
        if (err) return res.status(400).json({ error: err.sqlMessage });
        res.json({ message: "Attendance updated successfully" });
      });
    } else {
      // Insert new attendance
      const insertSql = "INSERT INTO attendance (student_id, department_id, date, status, marked_by) VALUES (?, ?, ?, ?, ?)";
      db.query(insertSql, [student_id, department_id, date, status, marked_by], (err, result) => {
        if (err) return res.status(400).json({ error: err.sqlMessage });
        res.json({ message: "Attendance saved successfully" });
      });
    }
  });
});

// ================== AI ASSISTANT ENDPOINT ===================
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyDGlZsEYN1IOQMqUDsvuHGw8FyT6W0DhdY');

app.post('/api/ai/chat', async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  


  try {
    const systemPrompt = `You are CampusFlow AI Assistant for Acropolis Institute students.
    
Help with:
- Fee status, payment process, due dates
- Attendance percentage, improvement tips
- Placement drives, internships, resume building
- TC application, forms, approvals
- Academic queries (syllabus, exams, CGPA)
- Campus navigation, events, faculty contacts

Student context: Acropolis Institute of Technology & Research, Indore. Engineering college.
Use simple Hindi-English mix. Keep answers short (2-4 sentences).
Be encouraging, positive, helpful.

User message: "${message}"`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(systemPrompt + '\\nUser: ' + message);
    const reply = result.response.text();
    
    res.json({ reply });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ 
      error: 'AI service unavailable: ' + error.message,
      details: process.env.NODE_ENV === 'development' ? error.message : 'Try again later'
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

