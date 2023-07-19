import { AbstractInternalApiService } from '@/models/common/services/internalApi/AbstractInternalApiService';
import { DifficultyEnum } from '@/models/projects/enums/DifficultyEnum';

export class PitchInternalApiService extends AbstractInternalApiService {
  private static BASE_URL = '/pitch';

  async getPitchResponse(projectId: string, difficulty: DifficultyEnum, text?: string): Promise<any> {
    const response = await this.executePostQuery<any>(PitchInternalApiService.BASE_URL, {
      projectId,
      text,
      difficulty,
    });
    if (!response) {
      throw new Error('Something went wrong.');
    }

    return response;
  }

  async getPitchDecision(projectId: string, difficulty: DifficultyEnum): Promise<any> {
    const response = await this.executePostQuery<any>(`${PitchInternalApiService.BASE_URL}/decision`, {
      projectId,
      difficulty,
    });
    if (!response) {
      throw new Error('Something went wrong.');
    }

    return response;
  }
}
