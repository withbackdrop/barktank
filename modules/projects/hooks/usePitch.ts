import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';
import { deleteConversationLogByProjectId } from '@/models/ai/services/ConversationLogService';
import { PitchInternalApiService } from '@/models/projects/services/internalApi/PitchInternalApiService';
import { notifyAboutError } from '@/modules/application/utils/notifyAboutError';
import { PROBABILITY_PITCH_ACCEPT } from '@/modules/projects/components/PitchFlow/utils/constants';

interface ConversationInterface {
  id: string;
  actor: string;
  text: string;
  probability?: number;
}

const usePitch = (projectId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [willInvest, setWillInvest] = useState<boolean>(null);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [conversations, setConversations] = useState<ConversationInterface[]>([]);

  useEffect(() => {
    (async () => {
      await deleteConversationLogByProjectId(projectId);

      try {
        const pitchInternalService = new PitchInternalApiService(true);
        const response = await pitchInternalService.getPitchResponse(projectId);

        setIsLoading(false);
        setConversations((_conversations) => [
          ..._conversations,
          {
            actor: ConversationLogActorEnum.SYSTEM,
            text: response.response,
            probability: response.probability,
            id: uuidv4(),
          },
        ]);
      } catch (e) {
        notifyAboutError('Something went wrong. Please try again.');
      }
    })();
  }, []);

  const handleGetNextResponse = async (text) => {
    setConversations((_conversations) => [
      ..._conversations,
      { actor: ConversationLogActorEnum.USER, text, id: uuidv4() },
    ]);

    setIsThinking(true);
    try {
      const pitchInternalService = new PitchInternalApiService(true);
      const response = await pitchInternalService.getPitchResponse(projectId, text);
      if (response.probability >= PROBABILITY_PITCH_ACCEPT) {
        setWillInvest(true);
        setIsThinking(false);
        return;
      }

      if (conversations.length >= 6) {
        setWillInvest(false);
        setIsThinking(false);
        return;
      }

      setIsThinking(false);
      setConversations((_conversations) => [
        ..._conversations,
        {
          actor: ConversationLogActorEnum.SYSTEM,
          text: response.response,
          probability: response.probability,
          id: uuidv4(),
        },
      ]);
    } catch (e) {
      notifyAboutError('Something went wrong. Please try again.');
    }
  };

  return { conversations, isLoading, willInvest, isThinking, getResponse: handleGetNextResponse };
};

export default usePitch;
