import { internalApi } from '@/modules/application/utils/internalApi';
import { notifyAboutError } from '@/modules/application/utils/notifyAboutError';

export const uploadImage = async (file, uploadFolder) => {
  try {
    const result = await internalApi.postForm('/images/upload', {
      file,
      folder: uploadFolder,
    });

    return result?.data;
  } catch (error) {
    notifyAboutError(error);
    return null;
  }
};
