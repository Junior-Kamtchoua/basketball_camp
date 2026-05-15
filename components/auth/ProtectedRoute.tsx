import { ReactNode } from "react";

import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/getCurrentUser";

interface Props {
  children: ReactNode;

  role?: "ADMIN" | "USER";
}

export default async function ProtectedRoute({
  children,

  role,
}: Props) {
  const user = await getCurrentUser();

  /*
   NOT LOGGED IN
  */

  if (!user) {
    redirect("/login");
  }

  /*
   ROLE PROTECTION
  */

  if (role && user.role !== role) {
    if (user.role === "ADMIN") {
      redirect("/dashboard/admin");
    }

    redirect("/dashboard/user");
  }

  return <>{children}</>;
}
