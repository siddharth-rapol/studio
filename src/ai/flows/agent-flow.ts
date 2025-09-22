'use server';
/**
 * @fileOverview A conversational AI agent for farming advice.
 *
 * - agentFlow - A function that handles the conversational agent.
 * - AgentFlowInput - The input type for the agentFlow function.
 * - AgentFlowOutput - The return type for the agentFlow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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

export async function agentFlow(input: AgentFlowInput): Promise<AgentFlowOutput> {
    const { history, prompt } = input;

    const fullPrompt = `You are AgriGenius, an expert AI assistant for farmers. Your knowledge covers all aspects of agriculture, including but not limited to: crop management, soil science, pest and disease control, irrigation techniques, climate adaptation, and market trends. Provide clear, actionable, and data-driven advice.

    Conversation History:
    ${history.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
    
    Current User Prompt:
    ${prompt}
    
    Your Response:
    `;

    const { output } = await ai.generate({
        prompt: fullPrompt,
        output: {
            schema: z.object({ response: z.string() })
        }
    });

    return { response: output?.response ?? "I'm sorry, I couldn't generate a response." };
}
