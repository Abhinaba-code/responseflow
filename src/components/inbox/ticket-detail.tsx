"use client";
import { useState, useTransition, useEffect } from "react";
import type { Ticket } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChannelIcon } from "@/components/channel-icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bot,
  CornerDownLeft,
  Paperclip,
  Sparkles,
  Users,
} from "lucide-react";
import { SlaTimer } from "@/components/sla-timer";
import { format } from "date-fns";
import { suggestRepliesAction, summarizeTicketAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

type TicketDetailProps = {
  ticket: Ticket | undefined;
};

const priorityClasses: { [key in Ticket["priority"]]: string } = {
  P0: "border-red-500/50 text-red-500",
  P1: "border-orange-500/50 text-orange-500",
  P2: "border-yellow-500/50 text-yellow-500",
  P3: "border-green-500/50 text-green-500",
};

export function TicketDetail({ ticket }: TicketDetailProps) {
  const { toast } = useToast();
  const [isSummarizing, startSummaryTransition] = useTransition();
  const [isSuggesting, startSuggestionTransition] = useTransition();
  const [summary, setSummary] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [reply, setReply] = useState("");
  const [formattedLastUpdate, setFormattedLastUpdate] = useState("");
  const [formattedMessageTimestamps, setFormattedMessageTimestamps] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (ticket) {
      setFormattedLastUpdate(format(new Date(ticket.lastUpdate), "PPp"));
      const timestamps = ticket.messages.reduce((acc, message) => {
        acc[message.id] = format(new Date(message.timestamp), "p");
        return acc;
      }, {} as {[key: string]: string});
      setFormattedMessageTimestamps(timestamps);
      // Reset AI features on ticket change
      setSummary("");
      setSuggestions([]);
      setReply("");
    }
  }, [ticket]);

  const handleSummarize = () => {
    if (!ticket) return;
    const ticketDetails = ticket.messages.map(m => `${m.authorName}: ${m.text}`).join("\n");
    startSummaryTransition(async () => {
      const result = await summarizeTicketAction({ ticketDetails });
      if (result.success) {
        setSummary(result.summary);
      } else {
        toast({
          variant: "destructive",
          title: "Summarization Failed",
          description: result.error,
        });
      }
    });
  };

  const handleSuggestReplies = () => {
    if (!ticket) return;
    const lastMessage = ticket.messages[ticket.messages.length - 1];
    startSuggestionTransition(async () => {
      const result = await suggestRepliesAction({ query: lastMessage.text });
      if (result.success && result.suggestions) {
        setSuggestions(result.suggestions);
      } else {
        toast({
          variant: "destructive",
          title: "Suggestion Failed",
          description: result.error,
        });
      }
    });
  };
  
  if (!ticket) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <CornerDownLeft className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No ticket selected</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Please select a ticket from the list to view its details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:flex flex-1 flex-col h-[calc(100vh-4rem)]">
      <header className="p-4 border-b">
        <h2 className="font-semibold text-lg truncate">{ticket.subject}</h2>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
          <div className="flex items-center gap-1">
            <ChannelIcon channel={ticket.channel} />
            <span>{ticket.channel.replace("_", " ")}</span>
          </div>
          <span>&middot;</span>
          <span>{formattedLastUpdate}</span>
          <div className="ml-auto flex items-center gap-3">
            <Badge variant="outline" className={cn(priorityClasses[ticket.priority])}>
              {ticket.priority}
            </Badge>
            <SlaTimer slaDue={ticket.slaDue} />
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            {ticket.messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-3",
                  message.author === "agent" && "flex-row-reverse"
                )}
              >
                <Avatar>
                  <AvatarFallback>{message.authorAvatar}</AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "max-w-md w-fit rounded-lg px-4 py-2",
                    message.author === "user"
                      ? "bg-secondary"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                   <p className={cn("text-xs mt-1", message.author === 'user' ? 'text-muted-foreground' : 'text-primary-foreground/70')}>
                    {formattedMessageTimestamps[message.id]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <aside className="w-80 border-l bg-secondary/50">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base flex items-center justify-between">
                    Customer
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{ticket.requester.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{ticket.requester.name}</p>
                    <p className="text-sm text-muted-foreground">{ticket.status}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base flex items-center justify-between">
                    AI Assistant <Bot className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-2">
                  <Button onClick={handleSummarize} disabled={isSummarizing} size="sm" variant="outline" className="w-full">
                    {isSummarizing ? "Summarizing..." : "Summarize Conversation"}
                  </Button>
                  {summary && (
                    <div className="text-xs text-muted-foreground border p-2 rounded-md bg-background">{summary}</div>
                  )}
                  <Button onClick={handleSuggestReplies} disabled={isSuggesting} size="sm" variant="outline" className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isSuggesting ? "Generating..." : "Suggest Replies"}
                  </Button>
                  {suggestions.length > 0 && (
                     <div className="space-y-2 pt-2">
                      {suggestions.map((s, i) => (
                        <div key={i} onClick={() => setReply(s)} className="text-xs text-muted-foreground border p-2 rounded-md bg-background hover:bg-secondary cursor-pointer">
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </aside>
      </div>

      <footer className="p-4 border-t">
        <div className="relative">
          <Textarea
            placeholder="Type your reply here..."
            className="pr-20 min-h-[80px]"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button>Send</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
