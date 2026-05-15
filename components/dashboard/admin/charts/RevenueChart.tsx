"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import styles from "./RevenueChart.module.css";

const data = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 2400 },
  { month: "Mar", revenue: 1800 },
  { month: "Apr", revenue: 4200 },
  { month: "May", revenue: 3800 },
  { month: "Jun", revenue: 5100 },
];

export default function RevenueChart() {
  return (
    <div className={styles.chart}>
      <div className={styles.header}>
        <h2>Revenue Overview</h2>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
