
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating optimized irrigation schedules based on farm's soil and weather conditions.
 *
 * - optimizeIrrigationSchedule - A function that generates irrigation schedules.
 */

import {ai} from '@/ai/genkit';
import { OptimizeIrrigationScheduleInput, OptimizeIrrigationScheduleOutput, OptimizeIrrigationScheduleInputSchema, OptimizeIrrigationScheduleOutputSchema } from '@/ai/schema';

export async function optimizeIrrigationSchedule(
  input: OptimizeIrrigationScheduleInput
): Promise<OptimizeIrrigationScheduleOutput> {
  return optimizeIrrigationScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeIrrigationSchedulePrompt',
  input: {schema: OptimizeIrrigationScheduleInputSchema},
  output: {schema: OptimizeIrrigationScheduleOutputSchema},
  prompt: `You are an expert agricultural advisor specializing in irrigation optimization.

  Based on the provided information about the farm, generate an optimized irrigation schedule.

  Farm Information:
  - Soil Type: {{{soilType}}}
  - Weather Conditions: {{{weatherConditions}}}
  - Crop Type: {{{cropType}}}
  - Farm Size: {{{farmSize}}} acres
  - Water Source: {{{waterSource}}}
  - Irrigation Method: {{{irrigationMethod}}}
  - Crop History: {{{cropHistory}}}
   - GPS Location: {{{gpsLocation}}}
  - Elevation: {{{elevation}}}

  Provide a detailed irrigation schedule, estimate water usage, and include any relevant notes or recommendations.
  Assume that the GPS location will give you an idea of weather patterns.
  Weather conditions will give you a good idea of current conditions.
  Remember to take into account the climate and historical weather patterns of the GPS location.
  Consider the crop history when creating irrigation schedule.
  Also consider the soil type, irrigation method, farm size, and water source when creating your irrigation schedule.
  Do not mention soil composition, only use soil type when determining irrigation schedule.
  `,
});

const optimizeIrrigationScheduleFlow = ai.defineFlow(
  {
    name: 'optimizeIrrigationScheduleFlow',
    inputSchema: OptimizeIrrigationScheduleInputSchema,
    outputSchema: OptimizeIrrigationScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
