import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/getCurrentUser";

import ProfileCard from "@/components/dashboard/admin/profile/ProfileCard";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <ProfileCard
      first_name={user.first_name}
      last_name={user.last_name}
      email={user.email}
      role={user.role}
      avatar_url={user.avatar_url}
    />
  );
}
