import { getDashboardStats } from "@/services/dashboard/getDashboardStats";

export const dashboardResolver = {
  dashboardStats: async () => {
    return await getDashboardStats();
  },
};
