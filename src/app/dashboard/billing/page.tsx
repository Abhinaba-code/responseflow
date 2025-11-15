
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const proFeatures = [
    "Search",
    "Developer API",
    "Playbooks (AI)",
    "Analytics"
];

const enterpriseFeatures = [
    "All Pro features",
    "Automations (AI)",
    "Workload Reporting",
    "Quality Audits",
    "Dedicated Support"
];


export default function BillingPage() {
    const currentPlan = "Pro"; // This would come from user data

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight">Subscription Plans</h1>
                <p className="mt-2 text-lg text-muted-foreground">Choose the plan that's right for your team.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <Card className={cn("border-2", currentPlan === "Pro" ? "border-primary" : "")}>
                    <CardHeader>
                        <CardTitle className="text-2xl">Pro</CardTitle>
                        <CardDescription>For growing teams that need powerful tools and AI capabilities.</CardDescription>
                        <div className="text-4xl font-bold pt-4">$59 <span className="text-base font-normal text-muted-foreground">/ month</span></div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-semibold mb-3">Key Features:</h4>
                            <ul className="space-y-2">
                                {proFeatures.map(feature => (
                                    <li key={feature} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-green-500" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Button className="w-full" disabled={currentPlan === "Pro"}>
                            {currentPlan === "Pro" ? "Current Plan" : "Upgrade to Pro"}
                        </Button>
                    </CardContent>
                </Card>

                 <Card className={cn("border-2", currentPlan === "Enterprise" ? "border-primary" : "")}>
                    <CardHeader>
                        <CardTitle className="text-2xl">Enterprise</CardTitle>
                        <CardDescription>For large organizations requiring advanced automation and reporting.</CardDescription>
                         <div className="text-4xl font-bold pt-4">$99 <span className="text-base font-normal text-muted-foreground">/ month</span></div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-semibold mb-3">Everything in Pro, plus:</h4>
                            <ul className="space-y-2">
                                {enterpriseFeatures.map(feature => (
                                    <li key={feature} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-green-500" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <Button className="w-full" disabled={currentPlan === "Enterprise"}>
                            {currentPlan === "Enterprise" ? "Current Plan" : "Upgrade to Enterprise"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
