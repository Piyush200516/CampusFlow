const express = require("express");
const router = express.Router();
const db = require("../db");
const PDFDocument = require("pdfkit");

// pay fee
router.post("/pay-fee",(req,res)=>{

const {student_id,amount,transaction_id,payment_method} = req.body;

const sql = `
INSERT INTO student_fees
(student_id,amount,transaction_id,payment_method)
VALUES (?,?,?,?)`;

db.query(sql,
[student_id,amount,transaction_id,payment_method],
(err,result)=>{

if(err){
return res.json({error:err});
}

res.json({message:"Fee Submitted Successfully"});
});

});

// Generate TC PDF
router.get("/generate-tc-pdf", (req, res) => {
  const { fullName, enrollment, course, year, reason } = req.query;

  // Create PDF document
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  // Set response headers for file download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="TC_${enrollment || "Certificate"}.pdf"`
  );

  // Pipe the PDF to the response
  doc.pipe(res);

  // Header - School Name
  doc.fontSize(20).font("Helvetica-Bold").text("ACROPOLIS INSTITUTE OF TECHNOLOGY AND RESEARCH", {
    align: "center",
  });
  doc.moveDown(0.5);

  doc.fontSize(14).font("Helvetica").text("Raja Bhawan Road, Indore (M.P.)", { align: "center" });
  doc.moveDown(2);

  // TC Title
  doc.fontSize(18).font("Helvetica-Bold").text("TRANSFER CERTIFICATE", { align: "center" });
  doc.moveDown(2);

  // Student Details
  doc.fontSize(12).font("Helvetica");
  
  doc.text(`Student Name: ${fullName || "N/A"}`, { continued: false });
  doc.moveDown(0.5);
  
  doc.text(`Enrollment Number: ${enrollment || "N/A"}`, { continued: false });
  doc.moveDown(0.5);
  
  doc.text(`Course/Branch: ${course || "N/A"}`, { continued: false });
  doc.moveDown(0.5);
  
  doc.text(`Passing Year: ${year || "N/A"}`, { continued: false });
  doc.moveDown(0.5);
  
  doc.text(`Reason for Transfer: ${reason || "N/A"}`, { continued: false });
  doc.moveDown(2);

  // Date
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  doc.text(`Date: ${currentDate}`, { align: "right" });
  doc.moveDown(3);

  // Signature
  doc.text("_______________________", { align: "right" });
  doc.moveDown(0.5);
  doc.text("Principal/Head of Institution", { align: "right" });

  // Finalize the PDF
  doc.end();
});

module.exports = router;
