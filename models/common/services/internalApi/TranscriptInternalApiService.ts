import { AbstractInternalApiService } from '@/models/common/services/internalApi/AbstractInternalApiService';

export class TranscriptInternalApiService extends AbstractInternalApiService {
  private static BASE_URL = '/transcript';

  async getTranscriptForYoutubeUrl(url: string): Promise<string> {
    const transcriptData = await this.executePostQuery<any>(TranscriptInternalApiService.BASE_URL, { url });
    if (!transcriptData || transcriptData.length === 0) {
      throw new Error('Could not retrieve transcript.');
    }

    let text = '';
    transcriptData.forEach((data) => {
      text += data.text;
    });

    return text;
  }
}
