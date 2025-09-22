'use server';

/**
 * @fileOverview An AI agent that predicts potential crop diseases based on farm data and weather patterns.
 *
 * - predictCropDisease - A function that handles the crop disease prediction process.
 * - PredictCropDiseaseInput - The input type for the predictCropDisease function.
 * - PredictCropDiseaseOutput - The return type for the predictCropDisease function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictCropDiseaseInputSchema = z.object({
  farmSize: z.string().describe('The size of the farm in acres.'),
  soilType: z.string().describe('The type of soil on the farm (e.g., sandy, clay, loam).'),
  cropHistory: z.string().describe('A description of the crops previously grown on the farm.'),
  weatherObservations: z.string().describe('Recent weather observations for the farm location.'),
  gpsLocation: z.string().describe('The GPS coordinates of the farm.'),
});
export type PredictCropDiseaseInput = z.infer<typeof PredictCropDiseaseInputSchema>;

const PredictCropDiseaseOutputSchema = z.object({
  diseasePrediction: z.string().describe('The predicted crop diseases and their likelihood.'),
  preventiveMeasures: z.string().describe('Recommended preventive measures to protect the crops.'),
});
export type PredictCropDiseaseOutput = z.infer<typeof PredictCropDiseaseOutputSchema>;

export async function predictCropDisease(input: PredictCropDiseaseInput): Promise<PredictCropDiseaseOutput> {
  return predictCropDiseaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictCropDiseasePrompt',
  input: {schema: PredictCropDiseaseInputSchema},
  output: {schema: PredictCropDiseaseOutputSchema},
  prompt: `You are an AI-powered agricultural assistant that helps farmers predict potential crop diseases and recommend preventive measures.

  Analyze the following farm data and weather patterns to predict potential crop diseases:

  Farm Size: {{{farmSize}}}
  Soil Type: {{{soilType}}}
  Crop History: {{{cropHistory}}}
  Weather Observations: {{{weatherObservations}}}
  GPS Location: {{{gpsLocation}}}

  Based on this information, provide a detailed prediction of potential crop diseases and their likelihood. Also, suggest specific preventive measures that the farmer can take to protect their crops.
  `,
});

const predictCropDiseaseFlow = ai.defineFlow(
  {
    name: 'predictCropDiseaseFlow',
    inputSchema: PredictCropDiseaseInputSchema,
    outputSchema: PredictCropDiseaseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
