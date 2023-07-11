import { createFirestoreCollectionDocument } from '@/models/application/services/FirestoreService';

const COLLECTION_NAME = 'projects';

export async function createProject(name: string, description: string, youtubeUrl: string): Promise<any> {
  return createFirestoreCollectionDocument(COLLECTION_NAME, {
    name,
    description,
    youtubeUrl,
  });
}
