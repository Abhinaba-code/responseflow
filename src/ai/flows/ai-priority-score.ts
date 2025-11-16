'use server';

/**
 * @fileOverview A flow to calculate a priority score for a ticket using AI.
 *
 * - calculatePriorityScore - A function that handles the priority scoring process.
 * - CalculatePriorityScoreInput - The input type for the calculatePriorityScore function.
 * - CalculatePriorityScoreOutput - The return type for the calculatePriorityScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculatePriorityScoreInputSchema = z.object({
  subject: z.string().describe('The subject of the ticket.'),
  message: z.string().describe('The content of the latest message in the ticket.'),
  channel: z.string().describe('The channel through which the ticket was received (e.g., email, twitter, live_chat).'),
  sentiment: z.enum(['Positive', 'Neutral', 'Negative']).describe('The sentiment of the message.'),
  tags: z.array(z.string()).optional().describe('Any tags associated with the ticket, like "VIP".'),
  slaDue: z.string().describe('The ISO 8601 timestamp for when the SLA is due.'),
});

export type CalculatePriorityScoreInput = z.infer<typeof CalculatePriorityScoreInputSchema>;

const CalculatePriorityScoreOutputSchema = z.object({
  score: z.number().min(0).max(100).describe('A priority score from 0 to 100, where 100 is the highest priority.'),
  reasoning: z.string().describe('A brief explanation of why this score was given.'),
  priority: z.enum(['P0', 'P1', 'P2', 'P3']).describe('The suggested priority level based on the score.'),
});

export type CalculatePriorityScoreOutput = z.infer<typeof CalculatePriorityScoreOutputSchema>;


const prompt = ai.definePrompt({
    name: 'calculatePriorityScorePrompt',
    input: {
        schema: CalculatePriorityScoreInputSchema.extend({
            currentDate: z.string(),
        }),
    },
    output: {schema: CalculatePriorityScoreOutputSchema},
    prompt: `You are an expert AI at triaging customer support tickets. Your task is to generate a priority score from 0 to 100 for a new ticket based on multiple signals.

  Consider the following factors:
  - Urgency: Look for keywords like "urgent", "asap", "down", "broken", "refund", "can't log in". High urgency should significantly increase the score.
  - Sentiment: Negative sentiment should increase the score. Positive sentiment can lower it unless it's sarcastic.
  - Channel: Real-time channels like 'live_chat' or public channels like 'twitter' might be higher priority.
  - VIP Status: If the 'VIP' tag is present, the score should be much higher.
  - SLA Risk: Compare the slaDue time with the current time. If a breach is imminent, the score should be very high. Assume current time is {{currentDate}}.
  - Topic: Billing issues, complaints, and bugs are generally higher priority than general questions or feature requests.

  Based on the ticket below, calculate a priority score, determine the priority level (P0 for >90, P1 for 75-89, P2 for 50-74, P3 for <50), and provide a brief reasoning.

  Ticket Details:
  - Subject: {{{subject}}}
  - Message: {{{message}}}
  - Channel: {{{channel}}}
  - Sentiment: {{{sentiment}}}
  - Tags: {{#if tags}}{{#each tags}}{{{this}}} {{/each}}{{else}}None{{/if}}
  - SLA Due: {{{slaDue}}}
  `,
});

const calculatePriorityScoreFlow = ai.defineFlow(
  {
    name: 'calculatePriorityScoreFlow',
    inputSchema: CalculatePriorityScoreInputSchema,
    outputSchema: CalculatePriorityScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt({
        ...input,
        currentDate: new Date().toISOString(),
    });
    return output!;
  }
);


export async function calculatePriorityScore(input: CalculatePriorityScoreInput): Promise<CalculatePriorityScoreOutput> {
  return calculatePriorityScoreFlow(input);
}
