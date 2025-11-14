"use server";

import { generateReplySuggestions } from "@/ai/flows/ai-suggested-replies";
import { summarizeTicket } from "@/ai/flows/ai-summarize-ticket";
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
