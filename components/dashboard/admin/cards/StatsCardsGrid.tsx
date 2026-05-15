import {
  FaUsers,
  FaUserShield,
  FaBasketballBall,
  FaMoneyBillWave,
} from "react-icons/fa";

import StatsCard from "./StatsCard";

import styles from "./StatsCardsGrid.module.css";

interface Props {
  stats: {
    totalUsers: number;

    totalAdmins: number;

    totalTeams: number;

    totalPrograms: number;

    totalRevenue: number;
  };
}

export default function StatsCardsGrid({ stats }: Props) {
  return (
    <div className={styles.grid}>
      <StatsCard
        title="Users"
        value={stats.totalUsers}
        subtitle="Registered users"
        icon={FaUsers}
      />

      <StatsCard
        title="Admins"
        value={stats.totalAdmins}
        subtitle="Platform admins"
        icon={FaUserShield}
      />

      <StatsCard
        title="Teams"
        value={stats.totalTeams}
        subtitle="Active teams"
        icon={FaBasketballBall}
      />

      <StatsCard
        title="Programs"
        value={stats.totalPrograms}
        subtitle="Training programs"
        icon={FaBasketballBall}
      />

      <StatsCard
        title="Revenue"
        value={`$${stats.totalRevenue}`}
        subtitle="Total revenue"
        icon={FaMoneyBillWave}
      />
    </div>
  );
}
