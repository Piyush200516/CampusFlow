const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

const users = [
  {email: "cdc@college.in", password: "Cd369@"},
  {email: "fee@college.in", password: "Fe741@"},
  {email: "cs@college.in", password: "Cs123@"},
  {email: "ec@college.in", password: "Ec456@"},
  {email: "mech@college.in", password: "Me789@"},
  {email: "civil@college.in", password: "Ci321@"},
  {email: "ee@college.in", password: "Ee654@"},
  {email: "chem@college.in", password: "Ch987@"},
  {email: "it@college.in", password: "It147@"},
  {email: "auto@college.in", password: "Au258@"}
];

(async () => {
  // Create database connection
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "campus_portal"
  });

  console.log("Connected to database\n");

  for (let u of users) {
    const hash = await bcrypt.hash(u.password, 10);
    console.log(`Email: ${u.email}`);
    console.log(`Hash: ${hash}`);
    console.log("");
    
    // Update the database
    const [result] = await db.execute(
      "UPDATE users SET password=? WHERE email=?",
      [hash, u.email]
    );
    console.log(`Updated: ${result.affectedRows} row(s)\n`);
  }

  console.log("All passwords updated successfully!");
  await db.end();
})();

