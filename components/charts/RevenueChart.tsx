"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { monthlyRevenue } from "@/lib/dummy-data";

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: -18, bottom: 0 }} barGap={4}>
        <CartesianGrid vertical={false} stroke="#EAF2EC" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#5B6B60" }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#5B6B60" }} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid #EAF2EC", fontSize: 12 }}
          formatter={(value: number) => [`Rp ${value} jt`, undefined]}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="spp" name="SPP" fill="#1F6B3E" radius={[6, 6, 0, 0]} />
        <Bar dataKey="kegiatan" name="Kegiatan" fill="#D4A017" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
