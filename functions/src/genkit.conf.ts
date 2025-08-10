import { firebase } from '@genkit-ai/firebase';
import { configureGenkit } from 'genkit';

export default configureGenkit({
  plugins: [firebase()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
