import {
  FaHome,
  FaCalendarAlt,
  FaMoneyBill,
  FaBell,
  FaEnvelope,
  FaUser,
  FaCog,
  FaClipboardCheck,
  FaBasketballBall,
} from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FileText } from "lucide-react";

import { IconType } from "react-icons";

export interface UserSidebarLink {
  title: string;

  href: string;

  icon: IconType;
}

export const userSidebarLinks: UserSidebarLink[] = [
  {
    title: "Dashboard",

    href: "/dashboard/user",

    icon: FaHome,
  },

  {
    title: "Programs",

    href: "/dashboard/user/programs",

    icon: FaBasketballBall,
  },

  {
    title: "Attendance",

    href: "/dashboard/user/attendance",

    icon: FaClipboardCheck,
  },
  {
    title: "Forms",
    href: "/dashboard/user/forms",
    icon: FileText,
  },
  {
    title: "Payments",

    href: "/dashboard/user/payments",

    icon: FaMoneyBill,
  },

  {
    title: "Schedule",

    href: "/dashboard/user/schedule",

    icon: FaCalendarAlt,
  },

  {
    title: "Messages",

    href: "/dashboard/user/messages",

    icon: FaEnvelope,
  },

  {
    title: "Notifications",

    href: "/dashboard/user/notifications",

    icon: FaBell,
  },

  {
    title: "Profile",

    href: "/dashboard/user/profile",

    icon: FaUser,
  },

  {
    title: "Settings",

    href: "/dashboard/user/settings",

    icon: FaCog,
  },
  {
    title: "Performance",

    href: "/dashboard/user/performance",

    icon: FaChartLine,
  },
  {
    title: "Team",

    href: "/dashboard/user/team",

    icon: FaUsers,
  },
];
