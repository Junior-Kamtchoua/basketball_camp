export type UserRole = "SUPER_ADMIN" | "ADMIN" | "COACH" | "PLAYER" | "PARENT";

export interface User {
  id: string;

  first_name: string;
  last_name: string;

  email: string;

  role: UserRole;

  phone?: string;

  avatar_url?: string;

  is_active: boolean;
  is_verified: boolean;

  created_at: string;
  updated_at: string;
}
