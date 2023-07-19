import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';
import { Button, Card } from '@/modules/application/components/DesignSystem';
import PitchReplyForm from '@/modules/projects/components/PitchFlow/PitchReplyForm';
import usePitch from '@/modules/projects/hooks/usePitch';

import ConversationItemSystem from './ConversationItemSystem';
import ConversationItemThinking from './ConversationItemThinking';
import ConversationItemUser from './ConversationItemUser';

const PitchFlowPitch = ({ flowData: { project, difficulty }, onAccept }: any) => {
  const { conversations, isThinking, getResponse } = usePitch(project.id, difficulty);

  if (isThinking) {
    return (
      <Card elevation="l">
        <ConversationItemThinking />
      </Card>
    );
  }

  const canReply =
    conversations.length > 0 && conversations[conversations.length - 1].actor === ConversationLogActorEnum.SYSTEM;

  const isLastConversationItemUsers =
    conversations?.length > 0 && conversations[conversations.length - 1].actor === ConversationLogActorEnum.USER;

  return (
    <Card elevation="l" isOverflowHidden={true}>
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
        {isLastConversationItemUsers && <Button onClick={() => onAccept({ conversations })}>Next round</Button>}
      </div>
    </Card>
  );
};

export default PitchFlowPitch;
