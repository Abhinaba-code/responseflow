import { config } from 'dotenv';
config();

import '@/ai/flows/ai-suggested-replies.ts';
import '@/ai/flows/ai-summarize-ticket.ts';
import '@/ai/flows/ai-priority-score.ts';
import '@/ai/flows/ai-chatbot.ts';
import '@/ai/flows/ai-text-to-speech.ts';
