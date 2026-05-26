# CampusFlow Database Schema

CampusFlow follows database-per-service ownership. Services can publish events or expose APIs, but they do not reach into another service's tables.

## Databases

| Database | Owning service | Prisma schema |
| --- | --- | --- |
| `auth_db` | Auth Service | `services/auth-service/prisma/schema.prisma` |
| `user_db` | User Service | `services/user-service/prisma/schema.prisma` |
| `attendance_db` | Attendance Service | `services/attendance-service/prisma/schema.prisma` |
| `fee_db` | Fee Service | `services/fee-service/prisma/schema.prisma` |
| `event_db` | Event Service | `services/event-service/prisma/schema.prisma` |
| `logs_db` | Notification Service | `services/notification-service/prisma/schema.prisma` |
| `academic_db` | Academic Service | `services/academic-service/prisma/schema.prisma` |
| `library_db` | Library Service | `services/library-service/prisma/schema.prisma` |
| `document_db` | Document Service | `services/document-service/prisma/schema.prisma` |

## Cross-Service IDs

The schemas use stable external IDs for cross-service concepts:

- `authUserId` connects profile records to Auth Service users.
- `studentId`, `facultyId`, `departmentId`, and `courseId` are copied into service-owned records where needed.
- Audit and notification records keep `actorUserId`, `recipientUserId`, and `requestId` for traceability.

This keeps service databases deployable and migratable independently.

## Core Model Coverage

Auth Service:

- Users, roles, account status
- Sessions and refresh token tracking
- Email verification and password reset tokens
- Password history

User Service:

- Departments, courses
- Student, faculty, and admin profiles
- Role permission mapping
- Transfer certificate requests

Attendance Service:

- Subjects
- Attendance sessions and student records
- Aggregates for percentage calculation
- Generated report metadata

Fee Service:

- Fee plans
- Invoices and line items
- Payments and gateway references
- Pending dues alerts

Event Service:

- Companies
- College events, placement drives, internships
- Registrations and selection status
- Analytics snapshots

Notification Service:

- Notification templates and messages
- Audit logs
- Kafka integration event processing log

Academic Service:

- Academic years
- Subjects
- Timetable slots
- Assignments and submissions
- Exams, admit cards, results
- Faculty leave requests

Library Service:

- Book inventory
- Book copies
- Issue and return tracking
- Fines and reservations

Document Service:

- Secure uploaded documents
- Verification workflow
- Certificate requests
- File import/export jobs
