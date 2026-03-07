const express = require("express");
const router = express.Router();
const db = require("../db");

// Add company
router.post("/add-company",(req,res)=>{

const {company_name,job_role,package,eligibility_cgpa,last_date} = req.body;

const sql = `
INSERT INTO companies
(company_name,job_role,package,eligibility_cgpa,last_date)
VALUES (?,?,?,?,?)`;

db.query(sql,
[company_name,job_role,package,eligibility_cgpa,last_date],
(err,result)=>{

if(err){
return res.json({error:err});
}

res.json({message:"Company Added Successfully"});
});

});

module.exports = router;