export interface UserDashboardStats {
  attendanceRate: number;

  totalPrograms: number;

  totalPayments: number;

  unreadMessages: number;
}

export interface AttendanceChartData {
  month: string;

  attendance: number;
}

export interface UpcomingEvent {
  id: string;

  title: string;

  start_date: string;

  location: string | null;
}

export interface PlayerSchedule {
  id: string;

  title: string;

  description: string | null;

  location: string | null;

  start_time: string;

  end_time: string;

  coach_name: string | null;

  team_name: string | null;

  duration_hours: number;

  status: "UPCOMING" | "LIVE" | "COMPLETED";
}

export interface PaymentStats {
  totalPaid: number;

  pendingPayments: number;

  completedPayments: number;

  failedPayments: number;
}

export interface MonthlyPaymentData {
  month: string;

  amount: number;
}

export interface PaymentMethodData {
  method: string;

  total: number;
}

export interface UserNotification {
  id: string;

  title: string;

  message: string;

  type: string;

  is_read: boolean;

  created_at: string;
}
