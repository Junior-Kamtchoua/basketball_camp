import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/getCurrentUser";

import { getUserProfile } from "@/services/user-dashboard/getUserProfile";

import { getUserProfileStats } from "@/services/user-dashboard/getUserProfileStats";

import ProfileHero from "@/components/dashboard/user/profile/ProfileHero";

import ProfileStats from "@/components/dashboard/user/profile/ProfileStats";

import PlayerInformation from "@/components/dashboard/user/profile/PlayerInformation";

import MedicalNotes from "@/components/dashboard/user/profile/MedicalNotes";

import styles from "./page.module.css";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const [profile, stats] = await Promise.all([
    getUserProfile(user.id),

    getUserProfileStats(user.id),
  ]);

  if (!profile) {
    return <div>User not found</div>;
  }

  return (
    <div className={styles.container}>
      <ProfileHero profile={profile} />

      <ProfileStats stats={stats} />

      <div className={styles.infoGrid}>
        <PlayerInformation profile={profile} />

        <MedicalNotes notes={profile.medical_notes} />
      </div>
    </div>
  );
}
