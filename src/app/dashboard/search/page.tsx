'use client';

import { Search } from "lucide-react";
import { withPlanGuard } from "@/components/with-plan-guard";

function SearchPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Conversational search will be built here.</p>
        </div>
      </div>
    </div>
  );
}

export default withPlanGuard(SearchPage, "Pro");
