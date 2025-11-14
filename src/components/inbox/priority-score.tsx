"use client";

import { useState, useTransition, useEffect } from "react";
import type { Ticket, Sentiment } from "@/lib/types";
import { calculatePriorityScoreAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function PriorityScore({ ticket }: { ticket: Ticket }) {
  const { toast } = useToast();
  const [isScoring, startScoringTransition] = useTransition();
  const [scoreData, setScoreData] = useState<{
    score: number;
    reasoning: string;
    priority: string;
  } | null>(null);

  const handleCalculateScore = () => {
    if (!ticket) return;
    const lastMessage = ticket.messages[ticket.messages.length - 1];
    startScoringTransition(async () => {
      const result = await calculatePriorityScoreAction({
        subject: ticket.subject,
        message: lastMessage.text,
        channel: ticket.channel,
        sentiment: ticket.sentiment,
        tags: ticket.tags,
        slaDue: ticket.slaDue,
      });

      if (result.success) {
        setScoreData({
          score: result.score!,
          reasoning: result.reasoning!,
          priority: result.priority!,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Scoring Failed",
          description: result.error,
        });
      }
    });
  };

  useEffect(() => {
    // Reset score when ticket changes
    setScoreData(null);
  }, [ticket]);

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-base flex items-center justify-between">
          PriorityScore AI
          <BrainCircuit className="h-4 w-4 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        {scoreData ? (
          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative h-16 w-16">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        className="text-muted-foreground/20"
                        d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        className="text-primary"
                        d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${scoreData.score}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{scoreData.score}</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{scoreData.reasoning}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="space-y-1">
                <p className="text-sm font-semibold">Suggested Priority: <span className="text-primary">{scoreData.priority}</span></p>
                <p className="text-xs text-muted-foreground italic">{scoreData.reasoning}</p>
            </div>
          </div>
        ) : (
          <Button
            onClick={handleCalculateScore}
            disabled={isScoring}
            size="sm"
            variant="outline"
            className="w-full"
          >
            {isScoring ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <BrainCircuit className="mr-2 h-4 w-4" />
            )}
            {isScoring ? "Calculating..." : "Calculate Priority Score"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
