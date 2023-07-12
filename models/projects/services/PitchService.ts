import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OutputFixingParser } from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';

import { getModel, getOutputParser } from '@/models/ai/services/AiService';
import { getTemplateInitial } from '@/models/ai/services/TemplateService';
import { getProjectById } from '@/models/projects/services/ProjectService';

export async function getPitchResponse(projectId: string) {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new Error('Project not found.');
  }

  const outputParser = getOutputParser();
  const promptTemplate = new PromptTemplate({
    template: getTemplateInitial(),
    inputVariables: ['projectName', 'transcript'],
    partialVariables: {
      format_instructions: outputParser.getFormatInstructions(),
    },
  });

  const input = await promptTemplate.format({
    projectName: project.name,
    transcript: project.transcript,
  });

  const result = await getModel().call(input);

  try {
    return await outputParser.parse(result);
  } catch (e) {
    return null;
    console.log(e, 'failed');
  }

  // console.log(2);
  // const fixParser = OutputFixingParser.fromLLM(
  //   new ChatOpenAI({ openAIApiKey: process.env.NEXT_OPEN_API_KEY, temperature: 0 }),
  //   outputParser
  // );
  //
  // console.log(3);
  // const output = await fixParser.parse(result);
  //
  // console.log(4);
  // console.log('Fixed output: ');
  // console.log(output);
  // return result;
}
