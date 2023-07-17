import { useEffect } from 'react';

import Confetti from 'canvas-confetti';

import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';
import { Card, Note } from '@/modules/application/components/DesignSystem';
import Spinner from '@/modules/common/components/animations/Spinner';
import PitchReplyForm from '@/modules/projects/components/PitchFlow/PitchReplyForm';
import usePitch from '@/modules/projects/hooks/usePitch';

import ConversationItemSystem from './ConversationItemSystem';
import ConversationItemUser from './ConversationItemUser';

const PitchFlowPitch = ({ flowData: { project, difficulty } }: any) => {
  const { conversations, isLoading, getResponse, willInvest, isThinking } = usePitch(project.id, difficulty);

  useEffect(() => {
    if (willInvest === true) {
      Confetti({
        spread: 300,
        particleCount: 250,
        ticks: 300,
      });
    }
  }, [willInvest]);

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
        {isThinking && <Spinner />}
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
