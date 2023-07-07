import { captureException, setExtra } from '@sentry/nextjs';
import { toast } from 'react-toastify';

import { isString } from '@/modules/common/utils/stringUtils';

export const notifyAboutError = (error, _captureException = true, customMessage = null) => {
  let message: string | null = customMessage;
  if (!message) {
    if (isString(error)) {
      message = error;
    } else if (error?.response?.data?.error?.message) {
      message = error.response.data.error.message;
    } else if (error?.message) {
      message = error.message;
    } else {
      message = error?.response?.data?.message;
    }
  }
  if (!message) {
    message = 'Something went wrong';
  }

  if (_captureException) {
    setExtra('error', error);
    setExtra('message', message);
    captureException(error);
  }

  toast.error(message);
};
