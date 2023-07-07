import { AIQueryApiService } from '@/models/ai/services/api/AIQueryApiService';

export async function queryAI(query: string, variant = 'v2'): Promise<any> {
  const service = new AIQueryApiService(null, true);
  return service.queryAI(query, variant);
}
