import { AbstractInternalApiService } from '@/models/application/services/internalApi/AbstractInternalApiService';

export class AdminPlaygroundInternalApiService extends AbstractInternalApiService {
  private static BASE_URL = '/admin';

  async play(data: any): Promise<any> {
    return this.executePostQuery<any>(`${AdminPlaygroundInternalApiService.BASE_URL}/play`, data);
  }
}
