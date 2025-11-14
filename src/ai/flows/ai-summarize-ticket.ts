'use server';

/**
 * @fileOverview A flow to summarize a ticket or conversation detail using AI.
 *
 * - summarizeTicket - A function that handles the summarization process.
 * - SummarizeTicketInput - The input type for the summarizeTicket function.
 * - SummarizeTicketOutput - The return type for the summarizeTicket function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTicketInputSchema = z.object({
  ticketDetails: z.string().describe('The details of the ticket or conversation.'),
});

export type SummarizeTicketInput = z.infer<typeof SummarizeTicketInputSchema>;

const SummarizeTicketOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the ticket or conversation.'),
});

export type SummarizeTicketOutput = z.infer<typeof SummarizeTicketOutputSchema>;

export async function summarizeTicket(input: SummarizeTicketInput): Promise<SummarizeTicketOutput> {
  return summarizeTicketFlow(input);
}

const summarizeTicketPrompt = ai.definePrompt({
  name: 'summarizeTicketPrompt',
  input: {schema: SummarizeTicketInputSchema},
  output: {schema: SummarizeTicketOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing ticket details. Please provide a concise summary of the following ticket details:\n\nTicket Details: {{{ticketDetails}}}`,
});

const summarizeTicketFlow = ai.defineFlow(
  {
    name: 'summarizeTicketFlow',
    inputSchema: SummarizeTicketInputSchema,
    outputSchema: SummarizeTicketOutputSchema,
  },
  async input => {
    const {output} = await summarizeTicketPrompt(input);
    return output!;
  }
);
