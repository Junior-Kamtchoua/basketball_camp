import { permissions } from "./permissions";

export function checkPermissions(role: string, permission: string) {
  const rolePermissions = permissions[role as keyof typeof permissions];

  if (!rolePermissions) {
    return false;
  }

  return rolePermissions.includes(permission);
}
