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
  
  // Password that meets requirements: min 6 chars, 3 numbers, 1 capital, 1 special
  const newPassword = "CDC@123";
  
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update CDC user with email cdc@acropolis.in
    const sql = "UPDATE users SET password = ? WHERE email = ? AND role = 'cdc'";
    
    db.query(sql, [hashedPassword, "cdc@acropolis.in"], (err, result) => {
      if (err) {
        console.error("Error updating password:", err.sqlMessage);
      } else {
        console.log("CDC password updated successfully!");
        console.log("You can now login with:");
        console.log("Email: cdc@acropolis.in");
        console.log("Password: CDC@123");
      }
      db.end();
    });
  } catch (error) {
    console.error("Error:", error);
    db.end();
  }
});

