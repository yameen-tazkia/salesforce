/** Role-based access control. */

export const ROLES = ["admin", "consultant", "analyst", "viewer"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  admin: "Administrator",
  consultant: "Consultant",
  analyst: "Analyst",
  viewer: "Viewer",
};

export type Permission =
  | "accounts:read"
  | "accounts:update"
  | "notes:write"
  | "tags:write"
  | "reports:export"
  | "enrichment:run"
  | "scoring:configure"
  | "users:manage";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    "accounts:read",
    "accounts:update",
    "notes:write",
    "tags:write",
    "reports:export",
    "enrichment:run",
    "scoring:configure",
    "users:manage",
  ],
  consultant: [
    "accounts:read",
    "accounts:update",
    "notes:write",
    "tags:write",
    "reports:export",
    "enrichment:run",
  ],
  analyst: [
    "accounts:read",
    "accounts:update",
    "notes:write",
    "tags:write",
    "enrichment:run",
  ],
  viewer: ["accounts:read"],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}
