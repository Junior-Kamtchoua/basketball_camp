import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/getCurrentUser";

import { getUserNotifications } from "@/services/user-dashboard/getUserNotifications";

import UserNotifications from "@/components/dashboard/user/notifications/UserNotifications";

export default async function NotificationsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const notifications = await getUserNotifications(user.id);

  return <UserNotifications notifications={notifications} />;
}
