export const serviceNames = [
  "api-gateway",
  "auth-service",
  "user-service",
  "attendance-service",
  "fee-service",
  "event-service",
  "notification-service",
  "academic-service",
  "library-service",
  "document-service",
] as const;

export type ServiceName = (typeof serviceNames)[number];
