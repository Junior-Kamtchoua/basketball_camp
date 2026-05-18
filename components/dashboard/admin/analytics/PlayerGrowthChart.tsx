"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { PlayerGrowthAnalytics } from "@/types/analytics";

import styles from "./PlayerGrowthChart.module.css";

interface Props {
  data: PlayerGrowthAnalytics[];
}

export default function PlayerGrowthChart({ data }: Props) {
  const chartData =
    data.length > 0
      ? data
      : [
          {
            month: "No Data",
            players: 0,
          },
        ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <span className={styles.badge}>GROWTH</span>

          <h2>Player Growth</h2>

          <p>Monthly player registrations</p>
        </div>
      </div>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.1}
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="players" fill="#10b981" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
