const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req,res)=>{

const {full_name,email,enrollment_no,course,branch,passing_year,password} = req.body;

const hashedPassword = await bcrypt.hash(password,10);

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

res.json({message:"Student Registered Successfully"});
});

});

// Login
router.post("/login",(req,res)=>{

const {email,password} = req.body;

db.query("SELECT * FROM students WHERE email=?",
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

res.json({message:"Login Successful",user});

});

});

module.exports = router;