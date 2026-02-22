const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

// ================== MySQL Connection ==================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "CampusFlow"
});

db.connect(err => {
  if (err) {
    console.log("Database Connection Failed ❌");
  } else {
    console.log("Database Connected ✅");
  }
});

// ================== Password Rule ==================
const passwordRegex = /^(?=(?:.*\d){3,})(?=.*[A-Za-z])(?=.*@).+$/;

// ================== Register API ==================
app.post("/register", async (req, res) => {

  const { full_name, email, enrollment_no, course, branch, passing_year, password } = req.body;

  if (!passwordRegex.test(password)) {
    return res.json({ message: "Password must contain 1 alphabet, 3 numbers and @" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
  INSERT INTO students
  (full_name,email,enrollment_no,course,branch,passing_year,password)
  VALUES (?,?,?,?,?,?,?)`;

  db.query(sql,
    [full_name,email,enrollment_no,course,branch,passing_year,hashedPassword],
    (err,result)=>{
      if(err){
        return res.json({error:err});
      }
      res.json({message:"Student Registered Successfully ✅"});
    }
  );

});

// ================== Login API ==================
app.post("/login", (req,res)=>{

  const { email,password,role } = req.body;

  let table="";

  if(role==="student") table="students";
  else if(role==="cdc") table="cdc_users";
  else if(role==="fee") table="fee_department";
  else if(role==="department") table="department_users";
  else return res.json({message:"Invalid Role"});

  db.query(`SELECT * FROM ${table} WHERE email=?`,
  [email],
  async (err,result)=>{

    if(result.length===0){
      return res.json({message:"User Not Found"});
    }

    const user=result[0];
    const match = await bcrypt.compare(password,user.password);

    if(!match){
      return res.json({message:"Wrong Password"});
    }

    res.json({message:"Login Successful ✅",user});
  });

});

app.listen(5000,()=>{
  console.log("Server running on port 5000 🚀");
});