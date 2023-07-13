import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';
import { PitchInternalApiService } from '@/models/projects/services/internalApi/PitchInternalApiService';
import { Card } from '@/modules/application/components/DesignSystem';
import Spinner from '@/modules/common/components/animations/Spinner';
import PitchReplyForm from '@/modules/projects/components/PitchFlow/PitchReplyForm';

import ConversationItemSystem from './ConversationItemSystem';
import ConversationItemUser from './ConversationItemUser';

interface ConversationInterface {
  id: string;
  actor: string;
  text: string;
  probability?: number;
}

const PitchFlowPitch = ({ flowData: { project } }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [conversations, setConversations] = useState<ConversationInterface[]>([]);

  useEffect(() => {
    (async () => {
      const pitchInternalService = new PitchInternalApiService(true);
      const response = await pitchInternalService.getPitchResponse(project.id);
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
    const response = await pitchInternalService.getPitchResponse(project.id, text);
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

  if (isLoading) {
    return (
      <Card elevation="l">
        <Spinner align="center" size="m" />
      </Card>
    );
  }

  return (
    <Card elevation="l">
      <div className="flex flex-col space-y-4">
        {conversations.map((conversation) => {
          if (conversation.actor === ConversationLogActorEnum.USER) {
            return <ConversationItemUser key={conversation.id} text={conversation.text} />;
          }

          return (
            <ConversationItemSystem
              key={conversation.id}
              text={conversation.text}
              probability={conversation.probability}
            />
          );
        })}
        <PitchReplyForm onSubmit={handleGetNextResponse} />
      </div>
    </Card>
  );
};

export default PitchFlowPitch;
