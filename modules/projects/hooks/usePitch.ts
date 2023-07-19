import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';
import { addToConversationLog } from '@/models/ai/services/ConversationLogService';
import { DifficultyEnum } from '@/models/projects/enums/DifficultyEnum';
import { PitchInternalApiService } from '@/models/projects/services/internalApi/PitchInternalApiService';
import { useSessionContext } from '@/modules/application/contexts/SessionContext';
import { notifyAboutError } from '@/modules/application/utils/notifyAboutError';

interface ConversationInterface {
  id: string;
  actor: string;
  text: string;
  probability?: number;
}

const usePitch = (projectId: string, difficulty: DifficultyEnum) => {
  const { user } = useSessionContext();

  const [isThinking, setIsThinking] = useState<boolean>(true);
  const [conversations, setConversations] = useState<ConversationInterface[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const pitchInternalService = new PitchInternalApiService(true);
        const response = await pitchInternalService.getPitchResponse(projectId, difficulty);

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
        notifyAboutError(e, true, 'Something went wrong. Please try again.');
      }
    })();
  }, []);

  const handleGetNextResponse = async (text) => {
    await addToConversationLog(projectId, user.uid, ConversationLogActorEnum.USER, text);

    setConversations((_conversations) => [
      ..._conversations,
      { actor: ConversationLogActorEnum.USER, text, id: uuidv4() },
    ]);
  };

  return { conversations, isThinking, getResponse: handleGetNextResponse };
};

export default usePitch;
