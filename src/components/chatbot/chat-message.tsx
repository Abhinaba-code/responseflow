"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

type ChatMessageProps = {
  role: "user" | "model";
  content: string | React.ReactNode;
};

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isModel = role === "model";
  return (
    <div
      className={cn(
        "flex items-start gap-3",
        !isModel && "flex-row-reverse"
      )}
    >
      <Avatar className="h-8 w-8">
        <AvatarFallback>
            {isModel ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "max-w-xs w-fit rounded-lg px-3 py-2 text-sm",
          isModel
            ? "bg-secondary"
            : "bg-primary text-primary-foreground"
        )}
      >
        <div className="whitespace-pre-wrap">{content}</div>
      </div>
    </div>
  );
}
