import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';
import { ConversationLogInterface } from '@/models/ai/interfaces/ConversationLogInterface';
import {
  createFirestoreCollectionDocument,
  getFirestoreCollectionDocumentsByWhereConditions,
  getWhereQueryConstraint,
} from '@/models/application/services/FirestoreService';

const COLLECTION_NAME = 'conversationLog';

export async function addToConversationLog(
  projectId: string,
  actor: ConversationLogActorEnum,
  text: string
): Promise<any> {
  return createFirestoreCollectionDocument(COLLECTION_NAME, {
    projectId,
    actor,
    text,
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
  documents.forEach((document) => (text += `${document.actor}: ${document.text}\n`));

  return text;
}
