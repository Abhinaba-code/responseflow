import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

type KPICardProps = {
  title: string;
  value: string;
  change: string;
  isGood: boolean;
  icon: React.ReactNode;
};

export function KPICard({ title, value, change, isGood, icon }: KPICardProps) {
  const isPositive = change.startsWith('+');
  const changeColor = (isPositive && isGood) || (!isPositive && !isGood) 
    ? "text-green-500" 
    : "text-red-500";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn("text-xs text-muted-foreground flex items-center", changeColor)}>
          {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
          {change} vs last period
        </p>
      </CardContent>
    </Card>
  );
}
