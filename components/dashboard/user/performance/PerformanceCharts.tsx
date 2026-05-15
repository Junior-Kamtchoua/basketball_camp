"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { PerformanceChart } from "@/services/user-dashboard/getPerformanceData";

import styles from "./PerformanceCharts.module.css";

interface Props {
  chart: PerformanceChart[];
}

export default function PerformanceCharts({ chart }: Props) {
  return (
    <div className={styles.chartCard}>
      <h2>Performance Progression</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chart}>
          <CartesianGrid />

          <XAxis dataKey="date" />

          <Tooltip />

          <Line type="monotone" dataKey="score" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
