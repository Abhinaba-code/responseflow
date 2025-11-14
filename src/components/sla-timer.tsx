"use client";

import { useEffect, useState } from 'react';
import { differenceInMinutes, formatDistanceToNowStrict } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function SlaTimer({ slaDue }: { slaDue: string }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [urgency, setUrgency] = useState<'healthy' | 'at-risk' | 'breached'>('healthy');

  useEffect(() => {
    const updateTimer = () => {
      const dueDate = new Date(slaDue);
      const minutesLeft = differenceInMinutes(dueDate, new Date());

      if (minutesLeft < 0) {
        setTimeLeft('Breached');
        setUrgency('breached');
      } else {
        setTimeLeft(formatDistanceToNowStrict(dueDate));
        if (minutesLeft < 30) {
          setUrgency('at-risk');
        } else {
          setUrgency('healthy');
        }
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [slaDue]);

  const urgencyClasses = {
    healthy: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    'at-risk': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 animate-pulse-glow',
    breached: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  };

  if (!timeLeft) return null;

  return (
    <Badge variant="outline" className={cn("font-mono text-xs", urgencyClasses[urgency])}>
      {timeLeft}
    </Badge>
  );
}
