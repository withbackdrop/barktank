import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OpenAI } from 'langchain/llms/openai';
import { OutputFixingParser, StructuredOutputParser } from 'langchain/output_parsers';
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

export function getOutputParserFinal() {
  return StructuredOutputParser.fromZodSchema(
    z
      .object({
        decision: z
          .string()
          .describe('Your decision if you will invest and why. Above 80% means you invest. Lower you do not invest.'),
        probability: z.number().describe('A probability to invest. Between 0 and 100.'),
        price: z
          .string()
          .describe(
            'How much you would invest based on your opinion. It should be one of these values: 0, 1k, 5k, 10k, 50k, 100k, 200k, 300k, 400k, 500k, 600k, 700k, 800k, 900k, 1M'
          ),
      })
      .array()
      .describe('Probability to invest and decision why along with a price.')
  );
}

export function getModel() {
  return new OpenAI({ openAIApiKey: process.env.NEXT_OPEN_API_KEY, temperature: 0.7 });
}

export async function fixOutput(outputParser, result: string) {
  const fixParser = OutputFixingParser.fromLLM(
    new ChatOpenAI({ openAIApiKey: process.env.NEXT_OPEN_API_KEY, temperature: 0 }),
    outputParser
  );
  return fixParser.parse(result);
}
