# Prisma Database Ownership

CampusFlow uses database-per-service ownership. Each service owns its Prisma schema under:

- `services/auth-service/prisma/schema.prisma`
- `services/user-service/prisma/schema.prisma`
- `services/attendance-service/prisma/schema.prisma`
- `services/fee-service/prisma/schema.prisma`
- `services/event-service/prisma/schema.prisma`
- `services/notification-service/prisma/schema.prisma`

Cross-service relationships are represented with immutable external IDs rather than database-level foreign keys.
