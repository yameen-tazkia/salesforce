import type { Role } from "@/modules/auth/rbac";

export interface SeedUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  /** SHA-256 hex of the demo password. Replace with SSO in production. */
  passwordHash: string;
  title: string;
}

/**
 * Demo users. Passwords (for the demo environment only):
 *   tariq@tazkia.internal   → admin (Admin)
 *   amira@tazkia.internal   → consult (Consultant)
 *   omar@tazkia.internal    → consult (Consultant)
 *   layla@tazkia.internal   → analyst (Analyst)
 *   guest@tazkia.internal   → viewer (Viewer)
 * In production this module is replaced by the identity provider (SSO/OIDC).
 */
export const SEED_USERS: SeedUser[] = [
  {
    id: "u_admin",
    name: "Tariq Aziz",
    email: "tariq@tazkia.internal",
    role: "admin",
    passwordHash:
      "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", // "admin"
    title: "Managing Partner",
  },
  {
    id: "u_amira",
    name: "Amira Hassan",
    email: "amira@tazkia.internal",
    role: "consultant",
    passwordHash:
      "89fc0f6aa4921aac940a46b4653de04bb4aeae84578070b219ebfabd3aa360db", // "consult"
    title: "Principal Consultant",
  },
  {
    id: "u_omar",
    name: "Omar Farouk",
    email: "omar@tazkia.internal",
    role: "consultant",
    passwordHash:
      "89fc0f6aa4921aac940a46b4653de04bb4aeae84578070b219ebfabd3aa360db", // "consult"
    title: "Senior Solution Architect",
  },
  {
    id: "u_layla",
    name: "Layla Mansour",
    email: "layla@tazkia.internal",
    role: "analyst",
    passwordHash:
      "f44ceb062e35dfeea6ed7f8524d53bb0bff19f553e25cae7ef4850e4185ccbba", // "analyst"
    title: "Intelligence Analyst",
  },
  {
    id: "u_guest",
    name: "Guest Reviewer",
    email: "guest@tazkia.internal",
    role: "viewer",
    passwordHash:
      "d35ca5051b82ffc326a3b0b6574a9a3161dee16b9478a199ee39cd803ce5b799", // "viewer"
    title: "Reviewer",
  },
];
