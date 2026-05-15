import { ReactNode } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import UserDashboardLayout from "@/components/dashboard/user/layout/UserDashboardLayout";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <ProtectedRoute role="USER">
      <UserDashboardLayout>{children}</UserDashboardLayout>
    </ProtectedRoute>
  );
}
