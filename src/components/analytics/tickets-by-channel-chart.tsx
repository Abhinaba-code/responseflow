"use client"

import * as React from "react"
import { Pie, PieChart, Cell } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ticketsByChannelData } from "@/lib/data"

const chartConfig = {
  tickets: {
    label: "Tickets",
  },
  email: {
    label: "Email",
    color: "#3b82f6",
  },
  twitter: {
    label: "Twitter",
    color: "#0ea5e9",
  },
  live_chat: {
    label: "Live Chat",
    color: "#8b5cf6",
  },
  whatsapp: {
    label: "WhatsApp",
    color: "#22c55e",
  },
  discord: {
    label: "Discord",
    color: "#6366f1",
  },
  other: {
    label: "Other",
    color: "#a8a29e",
  },
} satisfies ChartConfig

export function TicketsByChannelChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[300px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={ticketsByChannelData}
          dataKey="value"
          nameKey="channel"
          innerRadius={60}
          strokeWidth={5}
        >
          {ticketsByChannelData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="channel" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}
