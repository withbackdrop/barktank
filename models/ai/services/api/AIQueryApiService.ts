import { AbstractApiService } from '@/models/application/services/api/AbstractApiService';

export class AIQueryApiService extends AbstractApiService {
  private static BASE_URL = 'query';

  async queryAI(query: string, variant = 'v1'): Promise<any> {
    return this.executePostQuery<any>(`${AIQueryApiService.BASE_URL}/`, { query, variant });
  }
}
