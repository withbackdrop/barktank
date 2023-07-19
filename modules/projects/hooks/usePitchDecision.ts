import { useEffect, useState } from 'react';

import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';
import { DifficultyEnum } from '@/models/projects/enums/DifficultyEnum';
import { PitchInternalApiService } from '@/models/projects/services/internalApi/PitchInternalApiService';
import { notifyAboutError } from '@/modules/application/utils/notifyAboutError';

interface ConversationDecisionInterface {
  actor: string;
  decision: string;
  price: string;
  probability?: number;
}

const usePitchDecision = (projectId: string, difficulty: DifficultyEnum) => {
  const [isThinking, setIsThinking] = useState<boolean>(true);
  const [conversation, setConversation] = useState<ConversationDecisionInterface>(null);

  useEffect(() => {
    (async () => {
      try {
        const pitchInternalService = new PitchInternalApiService(true);
        const response = await pitchInternalService.getPitchDecision(projectId, difficulty);

        setConversation({
          actor: ConversationLogActorEnum.SYSTEM,
          decision: response.decision,
          price: response.price,
          probability: response.probability,
        });

        setIsThinking(false);
      } catch (e) {
        notifyAboutError(e, true, 'Something went wrong. Please try again.');
      }
    })();
  }, []);

  return { conversation, isThinking };
};

export default usePitchDecision;
