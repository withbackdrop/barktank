import { useEffect, useState } from 'react';

import Confetti from 'canvas-confetti';

import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';
import { Card, Note } from '@/modules/application/components/DesignSystem';
import Spinner from '@/modules/common/components/animations/Spinner';
import PitchReplyForm from '@/modules/projects/components/PitchFlow/PitchReplyForm';
import usePitch, { ConversationInterface } from '@/modules/projects/hooks/usePitch';

import ConversationItemSystem from './ConversationItemSystem';
import ConversationItemUser from './ConversationItemUser';

const PitchFlowPitch = ({ flowData: { project } }: any) => {
  const { conversations, isLoading, getResponse } = usePitch(project.id);
  const [willInvest, setWillInvest] = useState<boolean>(null);

  useEffect(() => {
    if (conversations.length > 0) {
      const lastConversation = conversations[conversations.length - 1] as ConversationInterface;
      if (lastConversation.actor !== ConversationLogActorEnum.SYSTEM) {
        return;
      }

      if (conversations.length >= 6 && lastConversation.probability < 80) {
        setWillInvest(false);
        return;
      }

      if (lastConversation.probability < 80) {
        return;
      }

      setWillInvest(true);

      Confetti({
        spread: 300,
        particleCount: 250,
        ticks: 300,
      });
    }
  }, [conversations]);

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
        {willInvest === null &&
          conversations.length > 0 &&
          conversations[conversations.length - 1].actor === ConversationLogActorEnum.SYSTEM && (
            <PitchReplyForm onSubmit={getResponse} />
          )}
        {willInvest === true && (
          <Note color="green" align="center">
            Congrats! I have decided to invest!
          </Note>
        )}
        {willInvest === false && (
          <Note color="red" align="center">
            Unfortunately I have decided not to invest!
          </Note>
        )}
      </div>
    </Card>
  );
};

export default PitchFlowPitch;
