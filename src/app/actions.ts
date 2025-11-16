
"use server";

import { generateReplySuggestions } from "@/ai/flows/ai-suggested-replies";
import { summarizeTicket } from "@/ai/flows/ai-summarize-ticket";
import { calculatePriorityScore, type CalculatePriorityScoreInput } from "@/ai/flows/ai-priority-score";
import { chatbot, type ChatbotInput } from "@/ai/flows/ai-chatbot";
import { textToSpeech } from "@/ai/flows/ai-text-to-speech";
import { z } from "zod";

const SuggestRepliesInput = z.object({
  query: z.string(),
});

export async function suggestRepliesAction(input: z.infer<typeof SuggestRepliesInput>) {
  try {
    const { suggestions } = await generateReplySuggestions({
      query: input.query,
      tone: "helpful and friendly",
    });
    return { success: true, suggestions };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to generate suggestions." };
  }
}

const SummarizeTicketInput = z.object({
  ticketDetails: z.string(),
});

export async function summarizeTicketAction(input: z.infer<typeof SummarizeTicketInput>) {
  try {
    const { summary } = await summarizeTicket({
      ticketDetails: input.ticketDetails,
    });
    return { success: true, summary };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to generate summary." };
  }
}

const CalculatePriorityScoreInputSchema = z.object({
  subject: z.string(),
  message: z.string(),
  channel: z.string(),
  sentiment: z.enum(['Positive', 'Neutral', 'Negative']),
  tags: z.array(z.string()).optional(),
  slaDue: z.string(),
});


export async function calculatePriorityScoreAction(input: CalculatePriorityScoreInput) {
   const parsedInput = CalculatePriorityScoreInputSchema.safeParse(input);
    if (!parsedInput.success) {
      return { success: false, error: "Invalid input." };
    }
  try {
    const result = await calculatePriorityScore(input);
    return { success: true, ...result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to calculate priority score." };
  }
}


const ChatbotActionInput = z.object({
  history: z.array(z.string()),
});


export async function chatbotAction(input: z.infer<typeof ChatbotActionInput>) {
  const parsedInput = ChatbotActionInput.safeParse(input);
  if (!parsedInput.success) {
    return { success: false, error: "Invalid input." };
  }
  try {
    const result = await chatbot({ history: input.history });
    return { success: true, response: result.response };
  } catch (error) {
    console.error("Chatbot action error:", error);
    return { success: false, error: "Failed to get a response from the chatbot." };
  }
}

const TextToSpeechActionInput = z.object({
    text: z.string(),
});

export async function textToSpeechAction(input: z.infer<typeof TextToSpeechActionInput>) {
    const parsedInput = TextToSpeechActionInput.safeParse(input);
    if (!parsedInput.success) {
        return { success: false, error: "Invalid input." };
    }
    try {
        const result = await textToSpeech(input);
        return { success: true, audio: result.audio };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to convert text to speech." };
    }
}

    