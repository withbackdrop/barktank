import { createFirestoreCollectionDocument } from '@/models/application/services/FirestoreService';

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
