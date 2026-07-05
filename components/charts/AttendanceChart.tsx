"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { weeklyAttendanceTrend } from "@/lib/dummy-data";

export function AttendanceChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={weeklyAttendanceTrend} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="hadirFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F6B3E" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#1F6B3E" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#EAF2EC" />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#5B6B60" }} />
        <YAxis domain={[85, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#5B6B60" }} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid #EAF2EC", fontSize: 12 }}
          formatter={(value: number) => [`${value}%`, "Hadir"]}
        />
        <Area type="monotone" dataKey="hadir" stroke="#1F6B3E" strokeWidth={2.5} fill="url(#hadirFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
