"use client";

import React, { createContext, useState, useContext, useMemo } from 'react';

export type Plan = "Free" | "Pro" | "Enterprise";

type PlanContextType = {
  plan: Plan;
  setPlan: (plan: Plan) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Plan>("Free");

  const value = useMemo(() => ({ plan, setPlan }), [plan]);

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}
