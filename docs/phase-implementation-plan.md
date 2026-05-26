# CampusFlow Phase Implementation Plan

## Phase 1: Analysis

Completed in `docs/scalability-analysis.md`.

## Phase 2: Database Optimization

Scope:

- Add missing domain schemas for academic, library, and document services.
- Add indexes for high-cardinality list queries.
- Add audit columns to large tables.
- Add normalized records for receipts, login logs, placements, exams, results, library issues, and document workflows.
- Preserve service-owned database boundaries.

Database design rules:

- Every large table has `id`, `createdAt`, `updatedAt` where mutable, `deletedAt` where soft deletion is needed.
- Public APIs will expose snake_case JSON if required, but Prisma fields remain idiomatic camelCase.
- Cross-service joins are avoided. Services use immutable external IDs and compose data through APIs.
- Pagination is mandatory for all large collections.
- Search indexes are represented with practical B-tree indexes now; production migrations can add PostgreSQL GIN/trigram indexes for full-text search.

## Next Phases

Phase 3: RBAC and permissions

- Role seed matrix for Student, Faculty, HOD, Admin, CDC, Fee Department, Exam Cell, Library, Super Admin.
- Permission constants in shared contracts.
- Gateway authorization middleware.

Phase 4: Pagination/search/filter/sort APIs

- Shared query parser.
- Prisma query builders.
- Consistent metadata response shape.

Phase 5: Redis and queues

- Redis cache keys for dashboard summaries and profile lookups.
- BullMQ queues for reports, notifications, import validation, and export generation.

Phase 6: Bulk import/export

- CSV/XLSX upload validation.
- Import job tracking.
- PDF/Excel export jobs.

Phase 7: Frontend tables and dashboards

- TanStack Query cache.
- Virtualized tables.
- Debounced search.
- Empty, loading, and error states.

Phase 8-12:

- Reports, monitoring, load testing, bottleneck fixes, and deployment hardening.
