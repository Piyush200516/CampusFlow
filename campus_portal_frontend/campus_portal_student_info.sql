-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: campus_portal
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `student_info`
--

DROP TABLE IF EXISTS `student_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `college_email` varchar(100) DEFAULT NULL,
  `rgpv_enrollment` varchar(50) DEFAULT NULL,
  `institute_enrollment` varchar(50) DEFAULT NULL,
  `course` varchar(50) DEFAULT NULL,
  `branch` varchar(50) DEFAULT NULL,
  `batch_year` varchar(10) DEFAULT NULL,
  `section` varchar(10) DEFAULT NULL,
  `photo` text,
  `personal_name` varchar(100) DEFAULT NULL,
  `personal_email` varchar(100) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `whatsapp` varchar(20) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `category` varchar(20) DEFAULT NULL,
  `address` text,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `project_links` text,
  `project_description` text,
  `school_board` varchar(50) DEFAULT NULL,
  `school_year` varchar(10) DEFAULT NULL,
  `school_percent` varchar(10) DEFAULT NULL,
  `college_course` varchar(50) DEFAULT NULL,
  `college_branch` varchar(50) DEFAULT NULL,
  `college_name` varchar(100) DEFAULT NULL,
  `passing_year` varchar(10) DEFAULT NULL,
  `cgpa` varchar(10) DEFAULT NULL,
  `career_preference` varchar(100) DEFAULT NULL,
  `primary_domain` varchar(100) DEFAULT NULL,
  `skill_html` tinyint(1) DEFAULT '0',
  `skill_css` tinyint(1) DEFAULT '0',
  `skill_js` tinyint(1) DEFAULT '0',
  `skill_react` tinyint(1) DEFAULT '0',
  `skill_node` tinyint(1) DEFAULT '0',
  `skill_python` tinyint(1) DEFAULT '0',
  `skill_java` tinyint(1) DEFAULT '0',
  `skill_sql` tinyint(1) DEFAULT '0',
  `resume_link` text,
  `department_id` int DEFAULT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_info`
--

LOCK TABLES `student_info` WRITE;
/*!40000 ALTER TABLE `student_info` DISABLE KEYS */;
INSERT INTO `student_info` VALUES (1,6,'Sandeep','piyushmishra21052003@okhdfcbank','0827RL243D05','0827RL243D05','B.Tech','CSE','2027','CSE6',NULL,'Sandeep','piyushmishra21052003@okhdfcbank','08226050695','9981111939','Male','2026-03-03','Ger','Shiv Mandir Nursery Colony Mangaliya','Indore','Madhya Pradesh','453771','https://github.com/','bj','MP','2020','60.5','B.tech','CSE','wv','2027','5.55','WD','WD',0,1,0,0,0,1,0,0,'https://github.com/',1,'verified','2026-03-08 07:50:23','2026-03-08 08:10:41'),(2,9,'Ashish Sharma','ashishsharma240613@acropolis.in','0827RL243D02','0827RL243D02','B.Tech','CSE','2027','CSE6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'MP','2020','60.5',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0,0,0,0,0,NULL,1,'pending','2026-03-09 14:09:18','2026-03-09 14:09:18'),(3,13,'Shalini','Shalini172005@gmail.com','0827RL243D07','0827RL243D07','B.Tech','CSE','2027','6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0,0,0,0,0,NULL,1,'verified','2026-03-11 16:36:09','2026-03-11 16:39:46');
/*!40000 ALTER TABLE `student_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-22 12:22:29
