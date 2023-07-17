import {
  createFirestoreCollectionDocument,
  getFirestoreCollectionDocumentById,
  getFirestoreCollectionDocumentsByWhereConditions,
  getWhereQueryConstraint,
} from '@/models/application/services/FirestoreService';
import { ProjectInterface } from '@/models/projects/interfaces/ProjectInterface';

const COLLECTION_NAME = 'projects';

export async function createProject(
  userId: string,
  name: string,
  description: string,
  youtubeUrl: string,
  transcript: string
): Promise<any> {
  return createFirestoreCollectionDocument(COLLECTION_NAME, {
    userId,
    name,
    description,
    youtubeUrl,
    transcript,
  });
}

export async function getProjectById(projectId: string): Promise<ProjectInterface> {
  return getFirestoreCollectionDocumentById<ProjectInterface>(COLLECTION_NAME, projectId);
}

export async function getProjectsByUserId(userId: string): Promise<ProjectInterface[]> {
  const documents = await getFirestoreCollectionDocumentsByWhereConditions<ProjectInterface>(COLLECTION_NAME, [
    getWhereQueryConstraint('userId', '==', userId),
  ]);
  if (!documents) {
    return null;
  }

  return documents;
}
