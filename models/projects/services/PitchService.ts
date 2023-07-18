import { PromptTemplate } from 'langchain/prompts';

import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';
import { ConversationLogInterface } from '@/models/ai/interfaces/ConversationLogInterface';
import { fixOutput, getModel, getOutputParser, getOutputParserInitial } from '@/models/ai/services/AiService';
import { addToConversationLog, getConversationLogsByProjectId } from '@/models/ai/services/ConversationLogService';
import { getTemplateInitial, getTemplateResponse } from '@/models/ai/services/TemplateService';
import { DifficultyEnum } from '@/models/projects/enums/DifficultyEnum';
import { ProjectInterface } from '@/models/projects/interfaces/ProjectInterface';
import { getProjectById } from '@/models/projects/services/ProjectService';

async function getInitialPitchResponse(project: ProjectInterface, difficulty: DifficultyEnum) {
  const outputParser = getOutputParserInitial();
  const promptTemplate = new PromptTemplate({
    template: getTemplateInitial(difficulty),
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
    return await fixOutput(outputParser, result);
  }
}

async function getNextPitchResponse(
  project: ProjectInterface,
  difficulty: DifficultyEnum,
  text: string,
  conversationLog: ConversationLogInterface[]
) {
  const outputParser = getOutputParser();
  const promptTemplate = new PromptTemplate({
    template: getTemplateResponse(difficulty),
    inputVariables: ['projectName', 'transcript', 'text', 'lastProbability'],
    partialVariables: {
      format_instructions: outputParser.getFormatInstructions(),
    },
  });

  const lastProbability = conversationLog[conversationLog.length - 1].probability;
  const input = await promptTemplate.format({
    projectName: project.name,
    transcript: project.transcript,
    lastProbability,
    text,
  });

  const result = await getModel().call(input);

  try {
    return await outputParser.parse(result);
  } catch (e) {
    return await fixOutput(outputParser, result);
  }
}

export async function getPitchResponse(projectId: string, difficulty: DifficultyEnum, text?: string) {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new Error('Project not found.');
  }

  if (!text) {
    const response = await getInitialPitchResponse(project, difficulty);

    await addToConversationLog(
      projectId,
      project.userId,
      ConversationLogActorEnum.SYSTEM,
      response?.[0]?.response,
      response?.[0]?.probability
    );

    return response?.[0];
  }

  const conversationLog = await getConversationLogsByProjectId(projectId);

  const response = await getNextPitchResponse(project, difficulty, text, conversationLog);

  await addToConversationLog(projectId, project.userId, ConversationLogActorEnum.USER, text);
  await addToConversationLog(
    projectId,
    project.userId,
    ConversationLogActorEnum.SYSTEM,
    response?.[0]?.response,
    response?.[0]?.probability
  );

  return response?.[0];
}
