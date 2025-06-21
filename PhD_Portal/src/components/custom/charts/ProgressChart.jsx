"use client";

import { TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const defaultData = [
  { task: "ML", progress: 75 },
  { task: "DL", progress: 60 },
  { task: "AI Ethics", progress: 40 },
  { task: "Project", progress: 85 },
  { task: "NLP", progress: 55 },
  { task: "CV", progress: 90 },
];

const chartConfig = {
  progress: {
    label: "Progress",
    color: "var(--chart-1)",
  },
};

export default function ProgressChart({ data = defaultData }) {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <CardTitle>Course Progress</CardTitle>
        <CardDescription>Subject-wise progress overview</CardDescription>
      </CardHeader>
      <CardContent className="h-48 px-0"> {/* fixed height for chart area */}
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="task"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="progress" fill="var(--color-progress)" radius={6} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
\    </Card>
  );
}
