'use client';

import { CheckCircle } from "lucide-react";
import { withPlanGuard } from "@/components/with-plan-guard";

function QualityPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Quality review and coaching tools will be built here.</p>
        </div>
      </div>
    </div>
  );
}

export default withPlanGuard(QualityPage, "Enterprise");
