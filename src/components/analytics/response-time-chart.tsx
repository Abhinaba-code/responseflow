"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { responseTimeData } from "@/lib/data"

const chartConfig = {
  "Avg Time to First Response": {
    label: "First Response (min)",
    color: "hsl(var(--primary))",
  },
  "Avg Time to Resolution": {
    label: "Resolution (min)",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function ResponseTimeChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart accessibilityLayer data={responseTimeData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="Avg Time to First Response" fill="var(--color-Avg Time to First Response)" radius={4} />
        <Bar dataKey="Avg Time to Resolution" fill="var(--color-Avg Time to Resolution)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
