
import {z} from 'genkit';

// Agent Flow Schemas
const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

export const AgentFlowInputSchema = z.object({
  history: z.array(MessageSchema),
  prompt: z.string(),
});
export type AgentFlowInput = z.infer<typeof AgentFlowInputSchema>;

export const AgentFlowOutputSchema = z.object({
  response: z.string(),
});
export type AgentFlowOutput = z.infer<typeof AgentFlowOutputSchema>;


// Climate Adaptive Advice Schemas
export const ClimateAdaptiveAdviceInputSchema = z.object({
  farmSize: z.string().describe('The size of the farm in acres.'),
  soilType: z.string().describe('The type of soil on the farm.'),
  cropHistory: z.string().describe('A description of the crops previously grown on the farm.'),
  weatherObservations: z.string().describe('Recent weather observations for the farm area.'),
  location: z.string().describe('The GPS coordinates of the farm.'),
});
export type ClimateAdaptiveAdviceInput = z.infer<typeof ClimateAdaptiveAdviceInputSchema>;

export const ClimateAdaptiveAdviceOutputSchema = z.object({
  advice: z.string().describe('Climate-adaptive advice for the farmer.'),
});
export type ClimateAdaptiveAdviceOutput = z.infer<typeof ClimateAdaptiveAdviceOutputSchema>;


// Optimize Irrigation Schedule Schemas
export const OptimizeIrrigationScheduleInputSchema = z.object({
  soilType: z
    .string()
    .describe('The type of soil in the farm (e.g., sandy, clay, loam).'),
  weatherConditions: z
    .string()
    .describe('The current weather conditions (e.g., sunny, cloudy, rainy).'),
  cropType: z.string().describe('The type of crop being grown.'),
  farmSize: z.number().describe('The size of the farm in acres.'),
  waterSource: z.string().describe('The source of water for irrigation.'),
  irrigationMethod: z
    .string()
    .describe('The method of irrigation used.'),
  cropHistory: z.string().describe('A description of the crop history.'),
  gpsLocation: z.string().describe('The GPS location of the farm.'),
  elevation: z.number().describe('The elevation of the farm.'),
});
export type OptimizeIrrigationScheduleInput = z.infer<typeof OptimizeIrrigationScheduleInputSchema>;

export const OptimizeIrrigationScheduleOutputSchema = z.object({
  irrigationSchedule: z
    .string()
    .describe('The optimized irrigation schedule for the farm.'),
  waterUsageEstimate: z
    .string()
    .describe('Estimated water usage based on irrigation schedule.'),
  notes: z.string().describe('Any additional notes or recommendations.'),
});
export type OptimizeIrrigationScheduleOutput = z.infer<typeof OptimizeIrrigationScheduleOutputSchema>;
