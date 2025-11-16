/**
 * @fileoverview This file is the Next.js API route for Genkit.
 */

import {createApiHandler} from '@genkit-ai/next';
import {ai} from '@/ai/genkit';
import '@/ai/dev';

export const {GET, POST} = createApiHandler({
    ai,
});
