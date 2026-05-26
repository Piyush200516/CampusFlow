# CampusFlow Database Scalability Strategy

## Pagination

All list APIs must apply server-side pagination. Default:

```txt
page=1
limit=20
sortBy=createdAt
order=desc
```

Hard maximum:

```txt
limit=100
```

Cursor pagination can be added later for append-only tables such as `audit_logs`, `login_logs`, `attendance_records`, and `notification_messages`.

## Indexing

Phase 2 adds Prisma-managed B-tree indexes for common filters:

- status fields
- owner IDs such as `studentId`, `facultyId`, `departmentId`
- `createdAt`, `updatedAt`, `deletedAt`
- due dates and scheduled dates
- email/name fields used by admin search

Production migrations should add PostgreSQL-specific indexes where needed:

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX CONCURRENTLY students_search_trgm_idx
ON students USING gin ((first_name || ' ' || last_name || ' ' || email) gin_trgm_ops);
```

These raw indexes should live in migration SQL files after the first real database migration is generated.

## Connection Pooling

Use managed pooling for Neon or PgBouncer for VPS deployments. Recommended starting pool values per service:

```txt
minimum connections: 2
maximum connections: 20
idle timeout: 30 seconds
```

Increase per service only after measuring query latency and queue depth.

## Backups

Recommended production backup policy:

- daily automated PostgreSQL backups
- 14-day retention minimum
- monthly cold archive
- restore drill before launch and after major schema changes
- separate backup verification for document object storage

## Large Tables

Expected large tables:

- `attendance_records`
- `payments`
- `receipts`
- `results`
- `documents`
- `notification_messages`
- `audit_logs`
- `login_logs`

Rules:

- never expose unpaginated list APIs
- avoid cross-database joins
- cache dashboard summaries
- generate PDFs and Excel exports in background jobs
- keep audit/event logs append-only where possible
