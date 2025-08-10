import { firebase } from '@genkit-ai/firebase';
import { configureGenkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export default configureGenkit({
  plugins: [
    firebase(),
    googleAI({
      // O Genkit tentará usar a chave de API do `process.env.GOOGLE_GENAI_API_KEY`.
      // Precisaremos configurar essa variável de ambiente.
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
