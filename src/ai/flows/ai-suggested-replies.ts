'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating AI-powered reply suggestions for audience queries.
 *
 * - generateReplySuggestions - A function that generates reply suggestions for a given query.
 * - GenerateReplySuggestionsInput - The input type for the generateReplySuggestions function.
 * - GenerateReplySuggestionsOutput - The return type for the generateReplySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReplySuggestionsInputSchema = z.object({
  query: z.string().describe('The audience query to generate reply suggestions for.'),
  knowledgeSuggestions: z.array(z.string()).optional().describe('Matching articles, auto-insert snippets'),
  tone: z.string().optional().describe('The desired tone of the reply (e.g., formal, informal, friendly).'),
});
export type GenerateReplySuggestionsInput = z.infer<
  typeof GenerateReplySuggestionsInputSchema
>;

const GenerateReplySuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of AI-powered reply suggestions for the given query.'),
});
export type GenerateReplySuggestionsOutput = z.infer<
  typeof GenerateReplySuggestionsOutputSchema
>;

export async function generateReplySuggestions(
  input: GenerateReplySuggestionsInput
): Promise<GenerateReplySuggestionsOutput> {
  return generateReplySuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReplySuggestionsPrompt',
  input: {schema: GenerateReplySuggestionsInputSchema},
  output: {schema: GenerateReplySuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to provide helpful reply suggestions for audience queries.

  Given the following query, generate 3 distinct reply suggestions that are appropriate and helpful.
  Consider the specified tone when generating the suggestions.

  Query: {{{query}}}

  Tone: {{tone}}

  Knowledge Suggestions:
  {{#if knowledgeSuggestions}}
    {{#each knowledgeSuggestions}}- {{{this}}}\n    {{/each}}
  {{else}}
    No knowledge suggestions provided.
  {{/if}}
  Reply Suggestions:
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const generateReplySuggestionsFlow = ai.defineFlow(
  {
    name: 'generateReplySuggestionsFlow',
    inputSchema: GenerateReplySuggestionsInputSchema,
    outputSchema: GenerateReplySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
