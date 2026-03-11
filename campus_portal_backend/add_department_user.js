const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "campus_portal"
});

db.connect(async (err) => {
  if (err) {
    console.error("DB Error:", err);
    process.exit(1);
  }
  
  console.log("Connected to MySQL");
  
  // Department user details - change these as needed
  const deptUser = {
    full_name: "Department Admin",
    email: "department@acropolis.in",
    password: "DEPT@123", // Will be hashed
    role: "department",
    department_id: 1 // Adjust as needed
  };
  
  try {
    const hashedPassword = await bcrypt.hash(deptUser.password, 10);
    
    const sql = `INSERT INTO users (full_name, email, password, role, department_id) VALUES (?, ?, ?, ?, ?)`;
    
    db.query(sql, [deptUser.full_name, deptUser.email, hashedPassword, deptUser.role, deptUser.department_id], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.log("Department user already exists!");
        } else {
          console.error("Error creating user:", err.sqlMessage);
        }
      } else {
        console.log("Department user created successfully!");
        console.log("Email:", deptUser.email);
        console.log("Password:", deptUser.password);
      }
      db.end();
    });
  } catch (error) {
    console.error("Error:", error);
    db.end();
  }
});

