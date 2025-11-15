"use client";

import React from "react";
import { usePlan, type Plan } from "@/context/plan-context";
import { LockedPage } from "./locked-page";

const planHierarchy: { [key in Plan]: number } = {
  Free: 0,
  Pro: 1,
  Enterprise: 2,
};

export function withPlanGuard<P extends {}>(
  WrappedComponent: React.ComponentType<P>,
  requiredPlan: Plan
) {
  const WithPlanGuard = (props: P) => {
    const { plan } = usePlan();

    const currentPlanLevel = planHierarchy[plan];
    const requiredPlanLevel = planHierarchy[requiredPlan];

    if (currentPlanLevel < requiredPlanLevel) {
      return <LockedPage requiredPlan={requiredPlan} />;
    }

    return <WrappedComponent {...props} />;
  };

  WithPlanGuard.displayName = `WithPlanGuard(${getDisplayName(WrappedComponent)})`;

  return WithPlanGuard;
}

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
