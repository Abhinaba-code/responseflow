'use server';

/**
 * @fileOverview A conversational AI chatbot for the ResponseFlow application.
 *
 * - chatbot - A function that handles the chatbot conversation.
 * - ChatbotInput - The input type for the chatbot function.
 * - ChatbotOutput - The return type for the chatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatbotInputSchema = z.object({
  query: z.string().describe('The user\'s latest message.'),
  history: z.array(ChatMessageSchema).describe('The conversation history.'),
});

export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  response: z.string().describe('The AI\'s response to the user query.'),
});

export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function chatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: { schema: ChatbotInputSchema },
  output: { schema: ChatbotOutputSchema },
  prompt: `You are a helpful AI assistant for a customer support platform called "ResponseFlow".
  Your goal is to assist users with their questions about the platform.
  Be friendly, concise, and helpful.

  Use the provided conversation history to maintain context.

  {{#if history}}
  Conversation History:
  {{#each history}}
  {{role}}: {{content}}
  {{/each}}
  {{/if}}

  User's latest message:
  {{{query}}}

  Your response:
  `,
});


const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
