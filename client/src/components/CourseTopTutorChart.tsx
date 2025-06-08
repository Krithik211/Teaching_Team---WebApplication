// client/src/components/CourseTopTutorChart.tsx
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  LabelList,
} from "recharts";
import { CourseStat } from "@/types/Course";

interface Props { data: CourseStat[]; }

export default function CourseTopTutorChart({ data }: Props) {
  // Step A: build a new array where each entry has a `label` string
  const chartData = data.map(d => ({
    ...d,
    label: `${d.tutorName} (ID:${d.applicationId})`,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, bottom: 80, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="courseName"
          angle={-30}
          textAnchor="end"
          interval={0}
          height={60}
        />
        <YAxis
          allowDecimals={false}
          label={{ value: "Selections", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />

        {/* Step B: now just pull in the pre‐built `label` */}
        <Bar dataKey="selectionCount" radius={[4, 4, 0, 0]} fill="#4f46e5">
          <LabelList dataKey="label" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
