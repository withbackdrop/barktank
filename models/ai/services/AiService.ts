import { OpenAI } from 'langchain/llms/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';

export function getOutputParserInitial() {
  return StructuredOutputParser.fromZodSchema(
    z
      .object({
        response: z.string().describe('Feedback to the pitch followed by a critical question about the pitch.'),
        probability: z.number().describe('A probability to invest. Between 0 and 100.'),
      })
      .array()
      .describe('Response and a probability to invest.')
  );
}

export function getOutputParser() {
  return StructuredOutputParser.fromZodSchema(
    z
      .object({
        response: z.string().describe('AI response to the users reply. Includes a further question for the user.'),
        probability: z.number().describe('A probability to invest. Between 0 and 100.'),
      })
      .array()
      .describe('Response and a probability to invest.')
  );
}

export function getModel() {
  return new OpenAI({ openAIApiKey: process.env.NEXT_OPEN_API_KEY, temperature: 0.4 });
}
