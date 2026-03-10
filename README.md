# 🎓 CampusFlow - Campus Management System

A full-stack Campus Management System designed to manage academic and administrative activities for Students, CDC (Career Development Cell), Department, and College Student Section.

---

## 🚀 Project Status

🟢 **Student Dashboard** – Completed  
🟢 **CDC Panel** – Completed  
🟢 **Department Panel** – Completed  
🟢 **College Student Section (Fee)** – Completed  
🟢 **Backend API** – Completed  
🟢 **Database Integration** – Completed

---

## User Id & Password


## CDC ID = cdc@acropolis.in
## password = cdc@acropolis.in

## Fee_Depatment = fee@college.in
## password = Fee123@

## email         | role       | password                                                     |
+---------------+------------+--------------------------------------------------------------+
| cs@college.in | department   |  Cs123@


email         | password                                                     |
+---------------+--------------------------------------------------------------+
| ec@college.in | Ec123@
---
## 🏗️ Project Architecture

```
CampusFlow/
├── src/                           # React Frontend
│   ├── assets/                    # Static assets (images, logos)
│   ├── components/                # Reusable UI components
│   │   ├── Card.jsx               # Card component
│   │   ├── Loader.jsx             # Loading spinner
│   │   ├── Navbar.jsx             # Navigation bar
│   │   ├── ProtectedRoute.jsx     # Route protection
│   │   ├── Sidebar.jsx            # Sidebar navigation
│   │   └── Table.jsx             # Table component
│   ├── context/                   # React Context
│   │   └── DarkModeContext.jsx   # Dark mode state management
│   ├── layouts/                   # Layout components
│   │   ├── CDCLayout.jsx         # CDC module layout
│   │   ├── DepartmentLayout.jsx  # Department module layout
│   │   ├── FeeLayout.jsx         # Fee module layout
│   │   └── StudentsLayout.jsx    # Student module layout
│   ├── pages/                     # Page components
│   │   ├── Auth/                  # Authentication pages
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── CDC/                   # Career Development Cell module
│   │   │   ├── AddCompany.jsx
│   │   │   ├── Applications.jsx
│   │   │   ├── CDC_Layout.jsx
│   │   │   ├── CDC_Settings.jsx
│   │   │   ├── CDC_Sidebar.jsx
│   │   │   ├── CDC_Topbar.jsx
│   │   │   ├── CompanyList.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── StudentForms.jsx
│   │   │   └── UpdateStatus.jsx
│   │   ├── Department/            # Department module
│   │   │   ├── AttendanceUpdate.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Department_Layout.jsx
│   │   │   ├── Department_Settings.jsx
│   │   │   ├── Department_Sidebar.jsx
│   │   │   ├── Department_Topbar.jsx
│   │   │   ├── StudentList.jsx
│   │   │   └── VerifyForms.jsx
│   │   ├── Fee/                   # Fee/College Student Section module
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Fee_Layout.jsx
│   │   │   ├── Fee_Records.jsx
│   │   │   ├── Fee_Settings.jsx
│   │   │   ├── Fee_Sidebar.jsx
│   │   │   ├── Fee_Topbar.jsx
│   │   │   ├── FeeUpdate.jsx
│   │   │   ├── StudentFees.jsx
│   │   │   └── TCApproval.jsx
│   │   └── Student/               # Student module
│   │       ├── Administrative_Features.jsx
│   │       ├── Attendance.jsx
│   │       ├── Dashboard_Analytics.jsx
│   │       ├── Dashboard.jsx
│   │       ├── Fee.jsx
│   │       ├── FeePayment.jsx
│   │       ├── Information.jsx
│   │       ├── Internships.jsx
│   │       ├── Layout.jsx
│   │       ├── Plackment.jsx
│   │       ├── Settings.jsx
│   │       ├── Sidebar.jsx
│   │       ├── TC.jsx
│   │       └── Topbar.jsx
│   ├── routes/                     # Route definitions
│   │   └── AppRoutes.jsx          # Main application routes
│   ├── services/                   # API services
│   │   └── api.js                 # Axios API configuration
│   ├── App.jsx                     # Main App component
│   ├── index.css                   # Global styles
│   └── main.jsx                    # Application entry point
├── public/                          # Static assets
│   ├── Acropolis-logo.png
│   ├── aitr-logo.jpg
│   └── vite.svg
├── campus_portal_backend/           # Express.js Backend
│   ├── server.js                   # Main server file (API endpoints)
│   ├── package.json                # Backend dependencies
│   ├── generate_hash.js            # Utility script for password hashing
│   ├── db.js                       # Database connection
│   ├── routes/                     # API Route handlers
│   │   ├── authRoutes.js           # Authentication routes
│   │   ├── companyRoutes.js        # Company/CDC routes
│   │   ├── feeRoutes.js            # Fee management routes
│   │   └── ...                     # Other route files
│   └── node_modules/               # Backend dependencies
├── database.sql                    # Database schema
├── package.json                    # Frontend dependencies
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── eslint.config.js                # ESLint configuration
├── index.html                      # HTML entry point
├── generate_hash.js                 # Utility script
├── check_columns.js                # Database utility script
├── structure.txt                   # Project structure file
└── TODO.md                         # Task tracking
```

---


## 📋 Features

## 🎯 Website Improvements
- 📱 Mobile Responsive Design
- 📄 Auto-generated PDF Receipts
- 💳 Online Fee Payment Gateway Integration
- 🔔 Real-time Notifications
- 📧 Email Notifications


### 👨‍🎓 Student Module
- 📊 Student Dashboard (Overview)
- 📝 Information Form Submission
- 💼 Internships / Jobs Section
- 💰 Fee Management & Payment
- 📅 Attendance Tracking
- 🎯 Placement Drives
- 📄 TC (Transfer Certificate) Application
- ⚙️ Settings (Profile, Password Change)

### 🏢 CDC (Career Development Cell) Module
- 📊 CDC Dashboard
- ➕ Add Company
- 📋 Company List Management
- 📥 View Applications
- 🔄 Update Student Application Status
- 📄 Verify Student Forms
- ⚙️ CDC Settings

### 🏫 Department Module
- 📊 Department Dashboard
- 👥 Student List Management
- 📝 Attendance Update
- ✅ Verify Student Forms
- ⚙️ Department Settings

### 💵 Fee (College Student Section) Module
- 📊 Fee Dashboard
- 📚 Fee Records
- 👨‍🎓 Individual Student Fees
- ✏️ Fee Update
- ✅ TC Approval
- ⚙️ Fee Settings

### 🔐 Authentication & Security
- User Registration (Student, CDC, Department, Fee)
- Login with Role-Based Access Control
- JWT Token Authentication
- Password Hashing with bcrypt
- Protected Routes

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React.js** (v19) - UI Library
- 🎨 **Tailwind CSS** (v4) - Styling
- 🔁 **React Router** (v6) - Navigation
- ⚡ **Vite** - Build Tool
- 📦 **Axios** - HTTP Client
- 🎭 **Lucide React** - Icons
- 📛 **React Icons** - Icon Library

### Backend
- 🖥️ **Express.js** - Web Framework
- 💾 **MySQL** - Database
- 🔐 **bcrypt** - Password Hashing
- 🎫 **JWT** - Token Authentication
- 🌐 **CORS** - Cross-Origin Resource Sharing

---

## 🗄️ Database Schema

### Tables
- `users` - User accounts (students, CDC, Department, Fee)
- `student_info` - Student submitted information
- `departments` - Department details
- Additional tables for fees, companies, applications, etc.

---

## 🚦 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login

### Student
- `GET /students` - Get students list
- `POST /api/student/submit-info` - Submit student information
- `GET /api/student/info/:user_id` - Get student info

### Department
- `GET /api/department/forms/:department_id` - Get pending forms
- `POST /api/department/action` - Verify/Reject forms

### CDC
- `GET /api/cdc/forms` - Get all student forms
- `GET /api/cdc/student/:id` - Get student details

---

## 💻 Installation & Setup

### Prerequisites
- Node.js (v24.13.1)
- npm (11.7.0)
- MySQL (v8.0+)

### Frontend Setup
```bash
# Navigate to project directory
cd CampusFlow

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd campus_portal_backend

# Install dependencies
npm install

# Start backend server
npm start / node server.js  (only One used)
```

### Database Setup
1. Create a MySQL database named `campus_portal`
2. Import the `database.sql` file
3. Configure database credentials in `server.js`

---

## 🎯 Future Improvements

- 📊 Advanced Analytics Dashboard
- 📱 Mobile Application

---

## 🌟 Key Highlights

- Modern & Clean Dashboard UI
- Role-Based Access Control
- Dynamic Fee Status System
- TC Verification Workflow
- Company & Placement Management
- Dark Mode Support
- Component-Based Architecture
- RESTful API Design

---

## 📌 Author

