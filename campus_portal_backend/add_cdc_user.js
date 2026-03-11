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
  
  // CDC user details - change these as needed
  const cdcUser = {
    full_name: "CDC Admin",
    email: "cdc@acropolis.in",
    password: "CDC@123", // Will be hashed
    role: "cdc"
  };
  
  try {
    const hashedPassword = await bcrypt.hash(cdcUser.password, 10);
    
    const sql = `INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)`;
    
    db.query(sql, [cdcUser.full_name, cdcUser.email, hashedPassword, cdcUser.role], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.log("CDC user already exists!");
        } else {
          console.error("Error creating user:", err.sqlMessage);
        }
      } else {
        console.log("CDC user created successfully!");
        console.log("Email:", cdcUser.email);
        console.log("Password:", cdcUser.password);
      }
      db.end();
    });
  } catch (error) {
    console.error("Error:", error);
    db.end();
  }
});

