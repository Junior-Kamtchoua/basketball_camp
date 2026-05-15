"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

import styles from "./TeamAnalytics.module.css";

interface Props {
  data: {
    name: string;

    score: number;
  }[];
}

export default function TeamAnalytics({ data }: Props) {
  return (
    <div className={styles.card}>
      <h2>Team Analytics</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="name" />

          <Tooltip />

          <Bar dataKey="score" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
