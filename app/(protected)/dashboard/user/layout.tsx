import { ReactNode } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import UserDashboardLayout from "@/components/dashboard/user/layout/UserDashboardLayout";

import { getCurrentUser } from "@/lib/getCurrentUser";

import UserSocketWrapper from "@/components/socket/UserSocketWrapper";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <ProtectedRoute role="USER">
      <UserSocketWrapper userId={user.id}>
        <UserDashboardLayout>{children}</UserDashboardLayout>
      </UserSocketWrapper>
    </ProtectedRoute>
  );
}
