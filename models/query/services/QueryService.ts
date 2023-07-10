import { OpenAI } from 'langchain/llms/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';
import { z } from 'zod';

import { getTemplateInitial, getTemplateResponse } from '@/models/query/services/TemplateService';

export function getOutputParser() {
  return StructuredOutputParser.fromZodSchema(
    z
      .object({
        response: z
          .object({
            feedback: z.string().describe('Feedback to the pitch'),
            question: z.string().describe('Next ask a critical question about the pitch.'),
            probability: z.number().describe('A probability to invest. Between 0 and 100.'),
          })
          .array()
          .describe('JSON data of feedback, question and a probability'),
      })
      .describe('Invester pitch feedback and critique')
  );
}

function getModel() {
  return new OpenAI({ temperature: 0 });
}

export async function getResponseInitial(text: string) {
  const outputParser = getOutputParser();
  const promptTemplate = new PromptTemplate({
    template: getTemplateInitial(),
    inputVariables: ['context'],
    partialVariables: {
      format_instructions: outputParser.getFormatInstructions(),
    },
  });

  const input = await promptTemplate.format({
    context: text,
  });
  return getModel().call(input);
}

export async function getResponseNext(query: string, context: string, history: string) {
  const outputParser = getOutputParser();
  const promptTemplate = new PromptTemplate({
    template: getTemplateResponse(),
    inputVariables: ['query', 'context', 'history'],
    partialVariables: {
      format_instructions: outputParser.getFormatInstructions(),
    },
  });

  const input = await promptTemplate.format({
    query,
    context,
    history,
  });
  return getModel().call(input);
}
