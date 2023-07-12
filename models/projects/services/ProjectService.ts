import {
  createFirestoreCollectionDocument,
  getFirestoreCollectionDocumentById,
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
