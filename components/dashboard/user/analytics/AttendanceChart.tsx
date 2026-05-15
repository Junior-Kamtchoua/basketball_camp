"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { FaChartLine } from "react-icons/fa6";

import { AttendanceChartData } from "@/types/user-dashboard";

import styles from "./AttendanceChart.module.css";

interface Props {
  data: AttendanceChartData[];
}

export default function AttendanceChart({ data }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <span className={styles.badge}>Analytics</span>

          <h2>Attendance Overview</h2>

          <p>Track your monthly attendance consistency.</p>
        </div>

        <div className={styles.icon}>
          <FaChartLine size={22} />
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={360}>
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="attendanceGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.45} />

                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis dataKey="month" tickLine={false} axisLine={false} />

            <YAxis tickLine={false} axisLine={false} />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="attendance"
              stroke="#2563eb"
              strokeWidth={4}
              fill="url(#attendanceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
