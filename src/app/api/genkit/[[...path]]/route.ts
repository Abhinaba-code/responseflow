/**
 * @fileoverview This file is the Next.js API route for Genkit.
 */

import {createApi} from '@genkit-ai/next';
import '@/ai/dev';

export const {GET, POST} = createApi();
