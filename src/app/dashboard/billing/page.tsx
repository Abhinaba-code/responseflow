"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlan, type Plan } from "@/context/plan-context";
import { useWallet } from "@/context/wallet-context";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


const planCosts: { [key in Plan]: number } = {
    Free: 0,
    Pro: 4900,
    Enterprise: 8900,
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
    const [isConfirmingUpgrade, setIsConfirmingUpgrade] = useState(false);
    const [planToUpgrade, setPlanToUpgrade] = useState<Plan | null>(null);


    const handleUpgradeClick = (newPlan: Plan) => {
        setPlanToUpgrade(newPlan);
        setIsConfirmingUpgrade(true);
    };

    const executeUpgrade = () => {
        if (!planToUpgrade) return;

        const cost = planCosts[planToUpgrade];
        if (balance < cost) {
            toast({
                variant: "destructive",
                title: "Upgrade Failed",
                description: "Insufficient wallet balance. Please add funds to your wallet.",
            });
            return;
        }

        setBalance(prev => prev - cost);
        setPlan(planToUpgrade);
        toast({
            title: "Upgrade Successful!",
            description: `You are now on the ${planToUpgrade} plan. ₹${cost.toFixed(2)} has been deducted from your wallet.`,
        });
        
        setIsConfirmingUpgrade(false);
        setPlanToUpgrade(null);
    };
    
    const handleDowngrade = () => {
        if (plan === "Free") return;

        const refundAmount = planCosts[plan];
        setBalance(prev => prev + refundAmount);
        setPlan("Free");
        toast({
            title: "Downgrade Successful",
            description: `You are now on the Free plan. ₹${refundAmount.toFixed(2)} has been refunded to your wallet.`,
        });
    };

  return (
    <>
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight">Subscription Plans</h1>
                <p className="mt-2 text-lg text-muted-foreground">Choose the plan that's right for your team.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <Card className={cn("border-2 relative", (plan === "Pro" || plan === "Enterprise") ? "border-primary" : "")}>
                    {(plan === 'Pro' || plan === 'Enterprise') && <Badge className="absolute -top-3 right-4">{plan === 'Pro' ? 'Current Plan' : 'Included'}</Badge>}
                    <CardHeader>
                        <CardTitle className="text-2xl">Pro</CardTitle>
                        <CardDescription>For growing teams that need powerful tools and AI capabilities.</CardDescription>
                        <div className="text-4xl font-bold pt-4">₹{planCosts.Pro} <span className="text-base font-normal text-muted-foreground">/ month</span></div>
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
                        <Button className="w-full" disabled={plan === "Pro" || plan === "Enterprise"} onClick={() => handleUpgradeClick("Pro")}>
                            {plan === "Enterprise" ? "Included in Enterprise" : plan === "Pro" ? "Current Plan" : "Upgrade to Pro"}
                        </Button>
                    </CardContent>
                </Card>

                 <Card className={cn("border-2 relative", plan === "Enterprise" ? "border-primary" : "")}>
                    {plan === 'Enterprise' && <Badge className="absolute -top-3 right-4">Current Plan</Badge>}
                    <CardHeader>
                        <CardTitle className="text-2xl">Enterprise</CardTitle>
                        <CardDescription>For large organizations requiring advanced automation and reporting.</CardDescription>
                         <div className="text-4xl font-bold pt-4">₹{planCosts.Enterprise} <span className="text-base font-normal text-muted-foreground">/ month</span></div>
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
                         <Button className="w-full" disabled={plan === "Enterprise"} onClick={() => handleUpgradeClick("Enterprise")}>
                            {plan === "Enterprise" ? "Current Plan" : "Upgrade to Enterprise"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
             <div className="text-center mt-8">
                <Button variant="link" onClick={handleDowngrade} disabled={plan === "Free"}>
                    Downgrade to Free
                </Button>
            </div>
        </div>
      </div>
    </div>
    <AlertDialog open={isConfirmingUpgrade} onOpenChange={setIsConfirmingUpgrade}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Confirm Subscription Upgrade</AlertDialogTitle>
                <AlertDialogDescription>
                    You are about to upgrade to the <strong>{planToUpgrade}</strong> plan. 
                    This will deduct <strong>₹{planToUpgrade ? planCosts[planToUpgrade].toFixed(2) : '0.00'}</strong> from your wallet. 
                    Do you wish to continue?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setPlanToUpgrade(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={executeUpgrade}>Confirm Upgrade</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
