'use client';

import { withPlanGuard } from '@/components/with-plan-guard';
import DeveloperPageContent from '@/components/developer-page-content';

const GuardedDeveloperPage = withPlanGuard(DeveloperPageContent, "Pro");

export default GuardedDeveloperPage;
