
'use server';
/**
 * @fileOverview A conversational AI agent for farming advice.
 *
 * - agentFlow - A function that handles the conversational agent.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { AgentFlowInput, AgentFlowOutput, AgentFlowOutputSchema } from '@/ai/schema';

export async function agentFlow(input: AgentFlowInput): Promise<AgentFlowOutput> {
    const { history, prompt } = input;

    const fullPrompt = `You are AgriGenius, an expert AI assistant for Indian farmers. Your knowledge covers all aspects of agriculture in the Indian context, including but not limited to: crop management for local crops (rice, wheat, millet, sugarcane, cotton, etc.), soil types found in India, pest and disease control for the region, monsoon-based irrigation techniques, government schemes for farmers (like PM-KISAN), and local market (mandi) trends. Provide clear, actionable, simple, and data-driven advice. Always respond in a helpful and encouraging tone.

    Conversation History:
    ${history.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
    
    Current User Prompt:
    ${prompt}
    
    Your Response:
    `;

    const { output } = await ai.generate({
        prompt: fullPrompt,
        output: {
            schema: AgentFlowOutputSchema
        }
    });

    return { response: output?.response ?? "I'm sorry, I couldn't generate a response. Please try again." };
}
