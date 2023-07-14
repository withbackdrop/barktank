import { PromptTemplate } from 'langchain/prompts';

import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';
import { getModel, getOutputParser, getOutputParserInitial } from '@/models/ai/services/AiService';
import { addToConversationLog, getConversationLogString } from '@/models/ai/services/ConversationLogService';
import { getTemplateInitial, getTemplateResponse } from '@/models/ai/services/TemplateService';
import { ProjectInterface } from '@/models/projects/interfaces/ProjectInterface';
import { getProjectById } from '@/models/projects/services/ProjectService';

async function getInitialPitchResponse(project: ProjectInterface) {
  const outputParser = getOutputParserInitial();
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
    console.log(e, 'failed');
    return null;
  }
}

async function getNextPitchResponse(project: ProjectInterface, text: string, history: string) {
  const outputParser = getOutputParser();
  const promptTemplate = new PromptTemplate({
    template: getTemplateResponse(),
    inputVariables: ['projectName', 'transcript', 'text', 'history'],
    partialVariables: {
      format_instructions: outputParser.getFormatInstructions(),
    },
  });

  const input = await promptTemplate.format({
    projectName: project.name,
    transcript: project.transcript,
    text,
    history,
  });

  const result = await getModel().call(input);

  try {
    return await outputParser.parse(result);
  } catch (e) {
    console.log(e, 'failed');
    return null;
  }
}

export async function getPitchResponse(projectId: string, text?: string) {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new Error('Project not found.');
  }

  if (!text) {
    const response = await getInitialPitchResponse(project);

    await addToConversationLog(projectId, project.userId, ConversationLogActorEnum.SYSTEM, response?.[0]?.response);

    return response?.[0];
  }

  const history = await getConversationLogString(projectId);

  const response = await getNextPitchResponse(project, text, history);

  await addToConversationLog(projectId, project.userId, ConversationLogActorEnum.USER, text);
  await addToConversationLog(projectId, project.userId, ConversationLogActorEnum.SYSTEM, response?.[0]?.response);

  return response?.[0];
}
