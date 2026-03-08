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

## 🏗️ Project Architecture

```
CampusFlow/
├── src/                      # React Frontend
│   ├── components/           # Reusable UI components
│   ├── context/              # React Context (Dark Mode)
│   ├── layouts/             # Layout components
│   ├── pages/                # Page components
│   │   ├── Auth/            # Login, Register, Forgot Password
│   │   ├── Student/         # Student module pages
│   │   ├── CDC/              # Career Development Cell module
│   │   ├── Department/       # Department module
│   │   └── Fee/              # Fee/College Student Section module
│   ├── routes/               # Route definitions
│   └── services/             # API services
├── public/                   # Static assets
├── campus_portal_backend/    # Express.js Backend
│   ├── server.js             # Main server file
│   └── package.json          # Backend dependencies
├── database.sql              # Database schema
├── package.json              # Frontend dependencies
└── vite.config.js            # Vite configuration
```

---

## 📋 Features

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
- Node.js (v18+)
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
npm start
```

### Database Setup
1. Create a MySQL database named `campus_portal`
2. Import the `database.sql` file
3. Configure database credentials in `server.js`

---

## 🎯 Future Improvements

- 📱 Mobile Responsive Design
- 📄 Auto-generated PDF Receipts
- 💳 Online Fee Payment Gateway Integration
- 📊 Advanced Analytics Dashboard
- 🔔 Real-time Notifications
- 📧 Email Notifications
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

Developed by: **Piyush**  
B.Tech CSE at AITR (Acropolis Institute of Technology and Research)

---

## 🔗 GitHub Repository

[ CampusFlow on GitHub ](https://github.com/Piyush200516/CampusFlow)

---

## 📄 License

ISC License
