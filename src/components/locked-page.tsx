"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import Link from "next/link";
import type { Plan } from "@/context/plan-context";

type LockedPageProps = {
  requiredPlan: Plan;
};

export function LockedPage({ requiredPlan }: LockedPageProps) {
  return (
    <div className="flex items-center justify-center h-full p-6 bg-background">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <CardTitle>Upgrade to Unlock This Feature</CardTitle>
          <CardDescription>
            This feature is exclusively available for subscribers on the{" "}
            <strong>{requiredPlan}</strong> plan or higher.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Upgrade your plan to gain access to this and other powerful features designed to supercharge your workflow.
          </p>
          <Button asChild>
            <Link href="/dashboard/billing">View Plans & Upgrade</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
