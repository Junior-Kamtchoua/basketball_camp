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
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Player Growth</h2>

          <p>Monthly player registrations</p>
        </div>
      </div>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="players" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
