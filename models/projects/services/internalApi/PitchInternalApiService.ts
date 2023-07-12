import { AbstractInternalApiService } from '@/models/common/services/internalApi/AbstractInternalApiService';

export class PitchInternalApiService extends AbstractInternalApiService {
  private static BASE_URL = '/pitch';

  async getPitchResponse(projectId: string): Promise<string> {
    const response = await this.executePostQuery<any>(PitchInternalApiService.BASE_URL, { projectId });
    if (!response) {
      throw new Error('Something went wrong.');
    }

    return response;
  }
}