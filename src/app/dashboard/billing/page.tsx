"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlan, type Plan } from "@/context/plan-context";
import { useWallet } from "@/context/wallet-context";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const planCosts: { [key in Plan]: number } = {
    Free: 0,
    Pro: 59,
    Enterprise: 99,
};

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
    const { plan, setPlan } = usePlan();
    const { balance, setBalance } = useWallet();
    const { toast } = useToast();

    const handleUpgrade = (newPlan: Plan) => {
        const cost = planCosts[newPlan];
        if (balance < cost) {
            toast({
                variant: "destructive",
                title: "Upgrade Failed",
                description: "Insufficient wallet balance. Please add funds to your wallet.",
            });
            return;
        }

        setBalance(prev => prev - cost);
        setPlan(newPlan);
        toast({
            title: "Upgrade Successful!",
            description: `You are now on the ${newPlan} plan. $${cost} has been deducted from your wallet.`,
        });
    };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight">Subscription Plans</h1>
                <p className="mt-2 text-lg text-muted-foreground">Choose the plan that's right for your team.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <Card className={cn("border-2 relative", plan === "Pro" ? "border-primary" : "")}>
                    {plan === 'Pro' && <Badge className="absolute -top-3 right-4">Current Plan</Badge>}
                    <CardHeader>
                        <CardTitle className="text-2xl">Pro</CardTitle>
                        <CardDescription>For growing teams that need powerful tools and AI capabilities.</CardDescription>
                        <div className="text-4xl font-bold pt-4">${planCosts.Pro} <span className="text-base font-normal text-muted-foreground">/ month</span></div>
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
                        <Button className="w-full" disabled={plan === "Pro"} onClick={() => handleUpgrade("Pro")}>
                            {plan === "Pro" ? "Current Plan" : "Upgrade to Pro"}
                        </Button>
                    </CardContent>
                </Card>

                 <Card className={cn("border-2 relative", plan === "Enterprise" ? "border-primary" : "")}>
                    {plan === 'Enterprise' && <Badge className="absolute -top-3 right-4">Current Plan</Badge>}
                    <CardHeader>
                        <CardTitle className="text-2xl">Enterprise</CardTitle>
                        <CardDescription>For large organizations requiring advanced automation and reporting.</CardDescription>
                         <div className="text-4xl font-bold pt-4">${planCosts.Enterprise} <span className="text-base font-normal text-muted-foreground">/ month</span></div>
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
                         <Button className="w-full" disabled={plan === "Enterprise"} onClick={() => handleUpgrade("Enterprise")}>
                            {plan === "Enterprise" ? "Current Plan" : "Upgrade to Enterprise"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
             <div className="text-center mt-8">
                <Button variant="link" onClick={() => setPlan("Free")} disabled={plan === "Free"}>
                    Downgrade to Free
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
