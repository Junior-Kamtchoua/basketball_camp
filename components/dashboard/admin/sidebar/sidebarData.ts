import {
  FaHome,
  FaUsers,
  FaBasketballBall,
  FaCalendarAlt,
  FaMoneyBill,
  FaChartBar,
  FaCog,
  FaUser,
  FaBell,
  FaClipboardList,
  FaEnvelope,
  FaFileAlt,
} from "react-icons/fa";

import { IconType } from "react-icons";

interface SidebarLink {
  title: string;

  href: string;

  icon: IconType;
}

export const sidebarLinks: SidebarLink[] = [
  {
    title: "Dashboard",

    href: "/dashboard/admin",

    icon: FaHome,
  },

  {
    title: "Users",

    href: "/dashboard/admin/users",

    icon: FaUsers,
  },

  {
    title: "Forms",

    href: "/dashboard/admin/forms",

    icon: FaFileAlt,
  },

  {
    title: "Teams",

    href: "/dashboard/admin/teams",

    icon: FaBasketballBall,
  },

  {
    title: "Programs",

    href: "/dashboard/admin/programs",

    icon: FaCalendarAlt,
  },

  {
    title: "Schedule",

    href: "/dashboard/admin/schedule",

    icon: FaCalendarAlt,
  },

  {
    title: "Payments",

    href: "/dashboard/admin/payments",

    icon: FaMoneyBill,
  },

  {
    title: "Reports",

    href: "/dashboard/admin/reports",

    icon: FaChartBar,
  },

  {
    title: "Notifications",

    href: "/dashboard/admin/notifications",

    icon: FaBell,
  },

  {
    title: "Activity Logs",

    href: "/dashboard/admin/activity",

    icon: FaClipboardList,
  },

  {
    title: "Messages",

    href: "/dashboard/admin/messages",

    icon: FaEnvelope,
  },

  {
    title: "Settings",

    href: "/dashboard/admin/settings",

    icon: FaCog,
  },

  {
    title: "Profile",

    href: "/dashboard/admin/profile",

    icon: FaUser,
  },
];
