import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';
import { PitchInternalApiService } from '@/models/projects/services/internalApi/PitchInternalApiService';

interface ConversationInterface {
  id: string;
  actor: string;
  text: string;
  probability?: number;
}

const usePitch = (projectId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [conversations, setConversations] = useState<ConversationInterface[]>([]);

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  const handleGetNextResponse = async (text) => {
    setConversations((_conversations) => [
      ..._conversations,
      { actor: ConversationLogActorEnum.USER, text, id: uuidv4() },
    ]);

    const pitchInternalService = new PitchInternalApiService(true);
    const response = await pitchInternalService.getPitchResponse(projectId, text);
    setConversations((_conversations) => [
      ..._conversations,
      {
        actor: ConversationLogActorEnum.SYSTEM,
        text: response.response,
        probability: response.probability,
        id: uuidv4(),
      },
    ]);
  };

  return { conversations, isLoading, getResponse: handleGetNextResponse };
};

export default usePitch;
