import { Client as WorkFlowClient } from "@upstash/workflow";
import {QSTASH_TOKEN} from './env.js';

export const workflowClient = new WorkFlowClient({
    baseUrl: 'https://qstash.upstash.io',
    token: QSTASH_TOKEN
});