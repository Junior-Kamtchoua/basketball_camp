"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { RevenueAnalytics } from "@/types/analytics";

import styles from "./RevenueAnalyticsChart.module.css";

interface Props {
  data: RevenueAnalytics[];
}

export default function RevenueAnalyticsChart({ data }: Props) {
  const chartData =
    data.length > 0
      ? data
      : [
          {
            month: "No Data",
            revenue: 0,
          },
        ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <span className={styles.badge}>ANALYTICS</span>

          <h2>Revenue Analytics</h2>

          <p>Monthly revenue overview</p>
        </div>
      </div>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.5} />

                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.1}
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={4}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
