"use client"

import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { csatData } from "@/lib/data"

const chartConfig = {
  value: {
    label: "Reviews",
  },
  "5 Stars": {
    label: "5 Stars",
    color: "hsl(var(--chart-5))",
  },
  "4 Stars": {
    label: "4 Stars",
    color: "hsl(var(--chart-4))",
  },
  "3 Stars": {
    label: "3 Stars",
    color: "hsl(var(--chart-3))",
  },
  "1-2 Stars": {
    label: "1-2 Stars",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function CSATChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <BarChart
        accessibilityLayer
        data={csatData}
        layout="vertical"
        margin={{
          left: -20,
        }}
      >
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          className="capitalize"
        />
        <XAxis type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar
          dataKey="value"
          layout="vertical"
          radius={5}
        >
            {csatData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
            ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
