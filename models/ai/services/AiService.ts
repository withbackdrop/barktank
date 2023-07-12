import { OpenAI } from 'langchain/llms/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';

export function getOutputParserInitial() {
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

export function getOutputParser() {
  return StructuredOutputParser.fromZodSchema(
    z
      .object({
        response: z
          .object({
            response: z.string().describe('AI response to the users reply'),
            probability: z.number().describe('A probability to invest. Between 0 and 100.'),
          })
          .array()
          .describe('JSON data of response and a probability'),
      })
      .describe('Invester pitch response')
  );
}

export function getModel() {
  return new OpenAI({ openAIApiKey: process.env.NEXT_OPEN_API_KEY, temperature: 0 });
}
