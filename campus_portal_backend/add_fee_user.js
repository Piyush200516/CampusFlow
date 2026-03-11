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
  
  // Fee user details - change these as needed
  const feeUser = {
    full_name: "Fee Admin",
    email: "fee@acropolis.in",
    password: "FEE@123", // Will be hashed
    role: "fee"
  };
  
  try {
    const hashedPassword = await bcrypt.hash(feeUser.password, 10);
    
    const sql = `INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)`;
    
    db.query(sql, [feeUser.full_name, feeUser.email, hashedPassword, feeUser.role], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.log("Fee user already exists!");
        } else {
          console.error("Error creating user:", err.sqlMessage);
        }
      } else {
        console.log("Fee user created successfully!");
        console.log("Email:", feeUser.email);
        console.log("Password:", feeUser.password);
      }
      db.end();
    });
  } catch (error) {
    console.error("Error:", error);
    db.end();
  }
});

