'use client';

import { KPICard } from "@/components/analytics/kpi-card";
import { kpiData } from "@/lib/data";
import { BarChart3, Clock, Smile, Inbox } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponseTimeChart } from "@/components/analytics/response-time-chart";
import { TicketsByChannelChart } from "@/components/analytics/tickets-by-channel-chart";
import { CSATChart } from "@/components/analytics/csat-chart";
import { withPlanGuard } from "@/components/with-plan-guard";

function AnalyticsPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Avg Time to First Response"
            value={kpiData.timeToFirstResponse.value}
            change={kpiData.timeToFirstResponse.change}
            isGood={kpiData.timeToFirstResponse.isGood}
            icon={<Clock className="text-blue-500" />}
          />
          <KPICard
            title="Avg Time to Resolution"
            value={kpiData.timeToResolution.value}
            change={kpiData.timeToResolution.change}
            isGood={kpiData.timeToResolution.isGood}
            icon={<Clock className="text-green-500" />}
          />
          <KPICard
            title="SLA Attainment"
            value={kpiData.slaAttainment.value}
            change={kpiData.slaAttainment.change}
            isGood={kpiData.slaAttainment.isGood}
            icon={<Smile className="text-indigo-500" />}
          />
          <KPICard
            title="Open Tickets Backlog"
            value={kpiData.backlog.value}
            change={kpiData.backlog.change}
            isGood={kpiData.backlog.isGood}
            icon={<Inbox className="text-orange-500" />}
          />
        </div>
        <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Response & Resolution Times (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponseTimeChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Inbox className="h-5 w-5" />
                Tickets by Channel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TicketsByChannelChart />
            </CardContent>
          </Card>
           <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smile className="h-5 w-5" />
                Customer Satisfaction (CSAT)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CSATChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default withPlanGuard(AnalyticsPage, "Pro");
