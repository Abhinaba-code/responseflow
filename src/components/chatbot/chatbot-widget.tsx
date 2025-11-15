"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Loader2, Send } from "lucide-react";
import { chatbotAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "./chat-message";

type Message = {
  role: "user" | "model";
  content: string;
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);


  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    startTransition(async () => {
      const result = await chatbotAction({
        query: input,
        history: messages,
      });

      if (result.success && result.response) {
        setMessages([
          ...newMessages,
          { role: "model", content: result.response },
        ]);
      } else {
        toast({
          variant: "destructive",
          title: "Chatbot Error",
          description: result.error || "Something went wrong.",
        });
        // Remove the user message if the API call fails
         setMessages(messages);
      }
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="rounded-full w-14 h-14 fixed bottom-6 right-6 shadow-lg"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-[400px] h-[500px] p-0 flex flex-col"
        sideOffset={10}
      >
        <div className="p-4 border-b flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">AI Assistant</h3>
        </div>
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="p-4 space-y-4">
            <ChatMessage
              role="model"
              content="Hello! How can I help you today?"
            />
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
            {isPending && (
                <ChatMessage role="model" content={<Loader2 className="h-5 w-5 animate-spin" />} />
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="relative">
            <Textarea
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="pr-12 min-h-[60px]"
            />
            <Button
              size="icon"
              className="absolute top-1/2 -translate-y-1/2 right-3 h-8 w-8"
              onClick={handleSend}
              disabled={isPending}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
