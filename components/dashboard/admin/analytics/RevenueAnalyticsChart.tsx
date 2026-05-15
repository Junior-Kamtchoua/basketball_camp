"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
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
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Revenue Analytics</h2>

          <p>Monthly revenue overview</p>
        </div>
      </div>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
