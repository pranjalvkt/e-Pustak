"use client";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function generateColors(count) {
  const colors = [];
  const hueStep = 360 / count;
  for (let i = 0; i < count; i++) {
    colors.push(`hsl(${i * hueStep}, 70%, 60%)`);
  }
  return colors;
}

export default function PieChartComponent({ data }) {
  const COLORS = generateColors(data.length);
  return (
    <PieChart width={300} height={350}>
      <Pie
        data={data}
        cx={150}
        cy={150}
        outerRadius={100}
        dataKey="value"
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
