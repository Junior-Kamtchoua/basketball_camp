import { ReactNode } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import AdminDashboardLayout from "@/components/dashboard/admin/layout/AdminDashboardLayout";

import { getNotifications } from "@/services/notifications/getNotifications";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const notifications = await getNotifications();

  return (
    <ProtectedRoute role="ADMIN">
      <AdminDashboardLayout notifications={notifications}>
        {children}
      </AdminDashboardLayout>
    </ProtectedRoute>
  );
}
