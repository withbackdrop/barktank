import { PromptTemplate } from 'langchain/prompts';

import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';
import { ConversationLogInterface } from '@/models/ai/interfaces/ConversationLogInterface';
import {
  fixOutput,
  getModel,
  getOutputParser,
  getOutputParserFinal,
  getOutputParserInitial,
} from '@/models/ai/services/AiService';
import {
  addToConversationLog,
  getConversationLogsByProjectId,
  getConversationLogString,
} from '@/models/ai/services/ConversationLogService';
import {
  getTemplateFinalDecision,
  getTemplateInitial,
  getTemplateResponse,
} from '@/models/ai/services/TemplateService';
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

export async function getPitchResponse(projectId: string, difficulty: DifficultyEnum) {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new Error('Project not found.');
  }

  const conversationLog = await getConversationLogsByProjectId(projectId);
  const lastReply = conversationLog?.length > 0 ? conversationLog[conversationLog.length - 1].text : null;
  if (!lastReply) {
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

  const response = await getNextPitchResponse(project, difficulty, lastReply, conversationLog);

  await addToConversationLog(
    projectId,
    project.userId,
    ConversationLogActorEnum.SYSTEM,
    response?.[0]?.response,
    response?.[0]?.probability
  );

  return response?.[0];
}

async function getPitchFinalDecision(project: ProjectInterface, difficulty: DifficultyEnum) {
  const conversationLogString = await getConversationLogString(project.id);
  const conversationLog = await getConversationLogsByProjectId(project.id);

  const allProbabilities = [];
  conversationLog.forEach((conversationLogItem) => {
    if (conversationLogItem.actor === ConversationLogActorEnum.SYSTEM) {
      allProbabilities.push(conversationLogItem.probability);
    }
  });

  const sum = allProbabilities.reduce((a, b) => a + b, 0);

  const outputParser = getOutputParserFinal();
  const promptTemplate = new PromptTemplate({
    template: getTemplateFinalDecision(difficulty, sum / allProbabilities.length),
    inputVariables: ['projectName', 'transcript', 'history'],
    partialVariables: {
      format_instructions: outputParser.getFormatInstructions(),
    },
  });

  const input = await promptTemplate.format({
    projectName: project.name,
    transcript: project.transcript,
    history: conversationLogString,
  });

  const result = await getModel().call(input);

  try {
    return await outputParser.parse(result);
  } catch (e) {
    return await fixOutput(outputParser, result);
  }
}

export async function getPitchDecision(projectId: string, difficulty: DifficultyEnum) {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new Error('Project not found.');
  }

  const response = await getPitchFinalDecision(project, difficulty);

  await addToConversationLog(
    projectId,
    project.userId,
    ConversationLogActorEnum.SYSTEM,
    response?.[0]?.decision,
    response?.[0]?.probability
  );

  return response?.[0];
}
