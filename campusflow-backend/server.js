const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const feeRoutes = require("./routes/feeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", companyRoutes);
app.use("/api", feeRoutes);

app.get("/",(req,res)=>{
  res.send("CampusFlow Backend Running 🚀");
});

app.listen(5000,()=>{
  console.log("Server running on port 5000");
});