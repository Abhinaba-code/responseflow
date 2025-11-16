
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
import { Bot, Loader2, Send, Mic, Volume2 } from "lucide-react";
import { chatbotAction, textToSpeechAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "./chat-message";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "model";
  content: string;
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLButtonElement>(null);
  const hasBeenDragged = useRef(false);

  useEffect(() => {
    // Set initial position to bottom right, ensures it runs only on client
    setPosition({
        x: window.innerWidth - 88, // 56px width + 2rem (32px) offset
        y: window.innerHeight - 88, // 56px height + 2rem (32px) offset
    });
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    // SpeechRecognition is a browser-only API
    if (typeof window !== 'undefined') {
        const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            if (event.error === 'no-speech' || event.error === 'aborted') {
            // Don't show an error for these common cases
            setIsListening(false);
            return;
            }
            console.error("Speech recognition error", event.error);
            toast({
                variant: "destructive",
                title: "Voice Error",
                description: "Sorry, I couldn't understand that. Please try again.",
            });
            setIsListening(false);
        };
        
        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
        } else {
            // We can toast here, but it might be annoying for users without support.
            // console.log("Speech recognition not supported in this browser.");
        }
    }
  }, [toast]);

  const playAudio = (audioDataUri: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(audioDataUri);
    audioRef.current = audio;
    setIsSpeaking(true);
    audio.play();
    audio.onended = () => {
      setIsSpeaking(false);
    };
  };

  const handleTextToSpeech = async (text: string) => {
    startTransition(async () => {
        const result = await textToSpeechAction({ text });
        if (result.success && result.audio) {
            playAudio(result.audio);
        } else {
            toast({
                variant: "destructive",
                title: "Speech Error",
                description: result.error || "Could not play audio.",
            });
        }
    });
  };
  
  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
        setIsListening(true);
      }
    } else {
        toast({
            variant: "destructive",
            title: "Voice Not Supported",
            description: "Your browser does not support voice recognition.",
        });
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');

    startTransition(async () => {
      try {
        const chatHistory = newMessages.map(m => `${m.role}: ${m.content}`);
        const result = await chatbotAction({
          history: chatHistory,
        });

        if (result.success && result.response) {
          const modelMessage: Message = { role: 'model', content: result.response };
          setMessages([
            ...newMessages,
            modelMessage,
          ]);
          await handleTextToSpeech(modelMessage.content);
        } else {
          toast({
            variant: 'destructive',
            title: 'Chatbot Error',
            description: result.error || 'Something went wrong.',
          });
          // Revert the message list if the API call fails
          setMessages(messages);
        }
      } catch (e) {
        console.error(e);
        toast({
          variant: 'destructive',
          title: 'Chatbot Error',
          description: 'An unexpected error occurred.',
        });
        setMessages(messages);
      }
    });
  };

  const onMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isOpen) {
        // Prevent dragging when popover is open
        return;
    }
    e.preventDefault();
    setIsDragging(true);
    hasBeenDragged.current = false;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging || !widgetRef.current) return;
    
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        hasBeenDragged.current = true;
    }

    setPosition((prevPos) => {
      const newX = prevPos.x + deltaX;
      const newY = prevPos.y + deltaY;
      return { x: newX, y: newY };
    });
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    if (isDragging) {
      setTimeout(() => {
        setIsDragging(false);
      }, 0);
    }
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (hasBeenDragged.current) {
        e.preventDefault();
        hasBeenDragged.current = false; // Reset for next interaction
        return;
    }
    setIsOpen((v) => !v);
  }


  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={widgetRef}
          size="icon"
          className="rounded-full w-14 h-14 fixed shadow-lg cursor-grab active:cursor-grabbing"
          style={{
            top: position.y,
            left: position.x,
            transform: `translate(-50%, -50%)`,
          }}
          onMouseDown={onMouseDown}
          onClick={onClick}
        >
          <Bot className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-[350px] h-[450px] p-0 flex flex-col"
        sideOffset={10}
      >
        <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                const lastMessage = messages.findLast(m => m.role === 'model');
                if (lastMessage) handleTextToSpeech(lastMessage.content);
              }}
              disabled={isSpeaking || isPending}
            >
              <Volume2 className="h-5 w-5" />
            </Button>
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
              className="pr-20 min-h-[60px]"
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center">
                 <Button
                    size="icon"
                    variant="ghost"
                    disabled={isPending}
                    onClick={handleVoiceInput}
                    className={cn(isListening && "bg-red-500/20 text-red-500")}
                >
                    <Mic className="h-4 w-4" />
                </Button>
                <Button
                size="icon"
                className="h-8 w-8"
                onClick={handleSend}
                disabled={isPending || !input.trim()}
                >
                <Send className="h-4 w-4" />
                </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

    