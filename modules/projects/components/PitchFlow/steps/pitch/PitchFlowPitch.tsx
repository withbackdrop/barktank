import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';
import { Button, Card, Text } from '@/modules/application/components/DesignSystem';
import PitchReplyForm from '@/modules/projects/components/PitchFlow/PitchReplyForm';
import steps from '@/modules/projects/components/PitchFlow/utils/steps';
import usePitch from '@/modules/projects/hooks/usePitch';

import ConversationItemSystem from './ConversationItemSystem';
import ConversationItemThinking from './ConversationItemThinking';
import ConversationItemUser from './ConversationItemUser';

const getCurrentRound = (currentStep: string) => {
  switch (currentStep) {
    case steps.ROUND_ONE:
      return 1;
    case steps.ROUND_TWO:
      return 2;
    case steps.ROUND_THREE:
      return 3;
    default:
      return null;
  }
};

const getWaitMessage = (currentStep: string) => {
  switch (currentStep) {
    case steps.ROUND_ONE:
      return 'What a waste of my time, but hang on while I watch your pitch...';
    case steps.ROUND_TWO:
      return 'I see... mmm...';
    case steps.ROUND_THREE:
      return 'Woof...';
    default:
      return null;
  }
};

const PitchFlowPitch = ({ flowData: { project, difficulty, currentStep }, onAccept }: any) => {
  const { conversations, isThinking, getResponse } = usePitch(project.id, difficulty);

  if (isThinking) {
    return (
      <Card elevation="l">
        <div className="flex flex-col items-center justify-center text-center">
          <Text fontWeight="bold" size="xl">
            Round {getCurrentRound(currentStep)} of 3
          </Text>
          <Text size="s" spacing="l">
            Try to get Bark Cuban to invest!
          </Text>
        </div>
        <ConversationItemThinking text={getWaitMessage(currentStep)} />
      </Card>
    );
  }

  const canReply =
    conversations.length > 0 && conversations[conversations.length - 1].actor === ConversationLogActorEnum.SYSTEM;

  const isLastConversationItemUsers =
    conversations?.length > 0 && conversations[conversations.length - 1].actor === ConversationLogActorEnum.USER;

  return (
    <Card elevation="l" isOverflowHidden={true}>
      <div className="flex flex-col items-center justify-center text-center">
        <Text fontWeight="bold" size="xl">
          Round {getCurrentRound(currentStep)} of 3
        </Text>
        <Text size="s" spacing="l">
          Try to get Bark Cuban to invest!
        </Text>
      </div>
      <div className="flex flex-col space-y-8">
        {conversations.map((conversation, index) => {
          if (conversation.actor === ConversationLogActorEnum.USER) {
            return <ConversationItemUser key={conversation.id} text={conversation.text} />;
          }

          return (
            <ConversationItemSystem
              key={conversation.id}
              text={conversation.text}
              probability={conversation.probability}
              isLastAnswer={index === conversations.length - 1}
            />
          );
        })}
        {canReply && <PitchReplyForm onSubmit={getResponse} />}
        {isLastConversationItemUsers && <Button onClick={() => onAccept({ conversations })}>Continue</Button>}
      </div>
    </Card>
  );
};

export default PitchFlowPitch;
