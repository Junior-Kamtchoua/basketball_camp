export interface RevenueAnalytics {
  month: string;

  revenue: number;
}

export interface PlayerGrowthAnalytics {
  month: string;

  players: number;
}

export interface ActivityLog {
  id: string;

  action: string;

  type: string;

  created_at: string;
}
