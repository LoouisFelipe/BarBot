import { onFlow } from '@genkit-ai/firebase/functions';
import { defineFlow } from 'genkit';
import * as z from 'zod';

export const jokeTeller = onFlow(
  {
    name: 'jokeTeller',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    // This is a placeholder for a real model call.
    // In a real app, you would use a model to generate a joke.
    return `Why did the ${subject} cross the road? To get to the other side!`;
  }
);
