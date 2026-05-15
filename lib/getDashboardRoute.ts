export function getDashboardRoute(role: string) {
  switch (role) {
    case "ADMIN":
      return "/dashboard/admin";

    case "USER":
      return "/dashboard/user";

    default:
      return "/";
  }
}
