-- =====================================================
-- Student Information Form Database Schema
-- Run this script in your MySQL database
-- =====================================================

-- Create student_info table
CREATE TABLE IF NOT EXISTS student_info (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  full_name VARCHAR(100),
  college_email VARCHAR(100),
  rgpv_enrollment VARCHAR(50),
  institute_enrollment VARCHAR(50),
  course VARCHAR(50),
  branch VARCHAR(50),
  batch_year VARCHAR(10),
  section VARCHAR(10),
  photo TEXT,
  personal_name VARCHAR(100),
  personal_email VARCHAR(100),
  mobile VARCHAR(20),
  whatsapp VARCHAR(20),
  gender VARCHAR(20),
  dob DATE,
  category VARCHAR(20),
  address TEXT,
  city VARCHAR(50),
  state VARCHAR(50),
  pincode VARCHAR(10),
  project_links TEXT,
  project_description TEXT,
  school_board VARCHAR(50),
  school_year VARCHAR(10),
  school_percent VARCHAR(10),
  college_course VARCHAR(50),
  college_branch VARCHAR(50),
  college_name VARCHAR(100),
  passing_year VARCHAR(10),
  cgpa VARCHAR(10),
  career_preference VARCHAR(100),
  primary_domain VARCHAR(100),
  skill_html BOOLEAN DEFAULT FALSE,
  skill_css BOOLEAN DEFAULT FALSE,
  skill_js BOOLEAN DEFAULT FALSE,
  skill_react BOOLEAN DEFAULT FALSE,
  skill_node BOOLEAN DEFAULT FALSE,
  skill_python BOOLEAN DEFAULT FALSE,
  skill_java BOOLEAN DEFAULT FALSE,
  skill_sql BOOLEAN DEFAULT FALSE,
  resume_link TEXT,
  department_id INT,
  status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_department_id (department_id),
  INDEX idx_status (status)
);

-- Optional: Create departments table if not exists
CREATE TABLE IF NOT EXISTS departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample departments data (optional)
-- INSERT INTO departments (name, code) VALUES 
-- ('Computer Science & Engineering', 'CSE'),
-- ('Information Technology', 'IT'),
-- ('Electronics & Communication', 'ECE'),
-- ('Mechanical Engineering', 'ME'),
-- ('Civil Engineering', 'CE');

-- Note: Make sure users table has department_id column
-- ALTER TABLE users ADD COLUMN department_id INT AFTER branch;

