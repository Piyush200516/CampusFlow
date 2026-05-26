export type Role =
  | "STUDENT"
  | "FACULTY"
  | "HOD"
  | "ADMIN"
  | "CDC"
  | "FEE_DEPARTMENT"
  | "EXAM_CELL"
  | "LIBRARY"
  | "SUPER_ADMIN";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: Role;
  permissions: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  requestId: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const defaultPagination = {
  page: 1,
  limit: 20,
  maxLimit: 100,
  sortBy: "createdAt",
  order: "desc",
} as const;
