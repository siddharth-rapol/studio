
'use server';

/**
 * @fileOverview A climate adaptive advice AI agent.
 *
 * - climateAdaptiveAdvice - A function that provides climate-adaptive advice to farmers.
 */

import {ai} from '@/ai/genkit';
import { ClimateAdaptiveAdviceInput, ClimateAdaptiveAdviceOutput, ClimateAdaptiveAdviceInputSchema, ClimateAdaptiveAdviceOutputSchema } from '@/ai/schema';


export async function climateAdaptiveAdvice(input: ClimateAdaptiveAdviceInput): Promise<ClimateAdaptiveAdviceOutput> {
  return climateAdaptiveAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'climateAdaptiveAdvicePrompt',
  input: {schema: ClimateAdaptiveAdviceInputSchema},
  output: {schema: ClimateAdaptiveAdviceOutputSchema},
  prompt: `You are an expert agricultural advisor providing climate-adaptive advice to farmers.

  Based on the following information about the farm, provide specific and actionable advice to enhance crop yield and resilience in the face of changing weather patterns.

  Farm Size: {{{farmSize}}}
  Soil Type: {{{soilType}}}
  Crop History: {{{cropHistory}}}
  Weather Observations: {{{weatherObservations}}}
  Location: {{{location}}}
  `,
});

const climateAdaptiveAdviceFlow = ai.defineFlow(
  {
    name: 'climateAdaptiveAdviceFlow',
    inputSchema: ClimateAdaptiveAdviceInputSchema,
    outputSchema: ClimateAdaptiveAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
