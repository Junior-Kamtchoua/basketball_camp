"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

import { PlayerEvaluation } from "@/services/user-dashboard/getPlayerEvaluations";

import styles from "./PerformanceChart.module.css";

interface Props {
  data: PlayerEvaluation[];
}

export default function PerformanceChart({ data }: Props) {
  return (
    <div className={styles.container}>
      <h2>Player Performance</h2>

      <ResponsiveContainer width="100%" height={420}>
        <RadarChart data={data}>
          <PolarGrid />

          <PolarAngleAxis dataKey="skill_name" />

          <PolarRadiusAxis />

          <Radar
            dataKey="score"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
