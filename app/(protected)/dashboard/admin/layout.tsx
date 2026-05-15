import { ReactNode } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import AdminDashboardLayout from "@/components/dashboard/admin/layout/AdminDashboardLayout";

import { getCurrentUser } from "@/lib/getCurrentUser";

import { getNotifications } from "@/services/notifications/getNotifications";

import UserSocketWrapper from "@/components/socket/UserSocketWrapper";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const user = await getCurrentUser();

  const notifications = await getNotifications();

  if (!user) {
    return null;
  }

  return (
    <ProtectedRoute role="ADMIN">
      <UserSocketWrapper userId={user.id}>
        <AdminDashboardLayout notifications={notifications}>
          {children}
        </AdminDashboardLayout>
      </UserSocketWrapper>
    </ProtectedRoute>
  );
}
