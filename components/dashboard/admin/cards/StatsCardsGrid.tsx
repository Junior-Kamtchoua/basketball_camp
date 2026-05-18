import {
  FaUsers,
  FaUserShield,
  FaBasketballBall,
  FaMoneyBillWave,
  FaClock,
  FaClipboardList,
  FaCalendarAlt,
  FaBell,
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

    pendingPayments: number;

    pendingApplications: number;

    totalEvents: number;

    totalNotifications: number;
  };
}

export default function StatsCardsGrid({ stats }: Props) {
  return (
    <div className={styles.grid}>
      <StatsCard
        title="Users"
        value={stats.totalUsers}
        subtitle="Registered players"
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
        value={`$${Number(stats.totalRevenue).toLocaleString()}`}
        subtitle="Total paid revenue"
        icon={FaMoneyBillWave}
      />

      <StatsCard
        title="Pending Payments"
        value={stats.pendingPayments}
        subtitle="Awaiting approval"
        icon={FaClock}
      />

      <StatsCard
        title="Applications"
        value={stats.pendingApplications}
        subtitle="Pending program requests"
        icon={FaClipboardList}
      />

      <StatsCard
        title="Events"
        value={stats.totalEvents}
        subtitle="Scheduled academy events"
        icon={FaCalendarAlt}
      />

      <StatsCard
        title="Notifications"
        value={stats.totalNotifications}
        subtitle="System notifications"
        icon={FaBell}
      />
    </div>
  );
}
