'use server';

/**
 * @fileOverview A climate adaptive advice AI agent.
 *
 * - climateAdaptiveAdvice - A function that provides climate-adaptive advice to farmers.
 * - ClimateAdaptiveAdviceInput - The input type for the climateAdaptiveAdvice function.
 * - ClimateAdaptiveAdviceOutput - The return type for the climateAdaptiveAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClimateAdaptiveAdviceInputSchema = z.object({
  farmSize: z.string().describe('The size of the farm in acres.'),
  soilType: z.string().describe('The type of soil on the farm.'),
  cropHistory: z.string().describe('A description of the crops previously grown on the farm.'),
  weatherObservations: z.string().describe('Recent weather observations for the farm area.'),
  location: z.string().describe('The GPS coordinates of the farm.'),
});
export type ClimateAdaptiveAdviceInput = z.infer<typeof ClimateAdaptiveAdviceInputSchema>;

const ClimateAdaptiveAdviceOutputSchema = z.object({
  advice: z.string().describe('Climate-adaptive advice for the farmer.'),
});
export type ClimateAdaptiveAdviceOutput = z.infer<typeof ClimateAdaptiveAdviceOutputSchema>;

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
