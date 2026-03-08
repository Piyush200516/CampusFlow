-- Drop existing table if it exists
DROP TABLE IF EXISTS student_info;

-- Create student_info table with correct columns
CREATE TABLE student_info (
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
  skill_html TINYINT(1) DEFAULT 0,
  skill_css TINYINT(1) DEFAULT 0,
  skill_js TINYINT(1) DEFAULT 0,
  skill_react TINYINT(1) DEFAULT 0,
  skill_node TINYINT(1) DEFAULT 0,
  skill_python TINYINT(1) DEFAULT 0,
  skill_java TINYINT(1) DEFAULT 0,
  skill_sql TINYINT(1) DEFAULT 0,
  resume_link TEXT,
  department_id INT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Verify table was created
DESCRIBE student_info;

