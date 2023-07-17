import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';
import { ConversationLogInterface } from '@/models/ai/interfaces/ConversationLogInterface';
import {
  createFirestoreCollectionDocument,
  deleteFirestoreCollectionDocumentById,
  getFirestoreCollectionDocumentsByWhereConditions,
  getWhereQueryConstraint,
} from '@/models/application/services/FirestoreService';

const COLLECTION_NAME = 'conversationLog';

export async function addToConversationLog(
  projectId: string,
  userId: string,
  actor: ConversationLogActorEnum,
  text: string,
  probability?: number
): Promise<any> {
  return createFirestoreCollectionDocument(COLLECTION_NAME, {
    projectId,
    userId,
    actor,
    text,
    probability: probability || null,
  });
}

export async function getConversationLogsByProjectId(projectId: string): Promise<ConversationLogInterface[]> {
  const documents = await getFirestoreCollectionDocumentsByWhereConditions<ConversationLogInterface>(COLLECTION_NAME, [
    getWhereQueryConstraint('projectId', '==', projectId),
  ]);
  if (!documents) {
    return null;
  }

  return documents;
}

export async function getConversationLogString(projectId: string): Promise<string> {
  const documents = await getConversationLogsByProjectId(projectId);
  if (!documents) {
    return '';
  }

  let text = '';
  documents.forEach(
    (document) => (text += `${document.actor}: ${document.text}. Probability to invest: ${document.probability}%.\n`)
  );

  return text;
}

export async function deleteConversationLogByProjectId(projectId: string): Promise<void> {
  const documents = await getConversationLogsByProjectId(projectId);
  if (!documents) {
    return null;
  }

  await Promise.all(
    documents.map(async (document) => deleteFirestoreCollectionDocumentById(COLLECTION_NAME, document.id))
  );
}
