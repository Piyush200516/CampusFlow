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
  
  // First, let's see all CDC users
  const checkSql = "SELECT id, full_name, email, role FROM users WHERE role = 'cdc'";
  db.query(checkSql, (err, results) => {
    if (err) {
      console.error("Error checking users:", err.sqlMessage);
      db.end();
      return;
    }
    
    if (results.length === 0) {
      console.log("No CDC users found!");
    } else {
      console.log("CDC Users in database:");
      results.forEach(user => {
        console.log(`- ID: ${user.id}, Name: ${user.full_name}, Email: ${user.email}`);
      });
    }
    
    // Now let's also check what password format is expected
    console.log("\n--- Login Test Info ---");
    console.log("CDC Login requires:");
    console.log("- Email with @ and .com/.in/.org");
    console.log("- Password: min 6 chars, 3 numbers, 1 capital, 1 special");
    console.log("\nDefault credentials you can use to test:");
    console.log("Email: cdc@acropolis.in");
    console.log("Password: CDC@123456"); // Must follow the password rules
    
    db.end();
  });
});

