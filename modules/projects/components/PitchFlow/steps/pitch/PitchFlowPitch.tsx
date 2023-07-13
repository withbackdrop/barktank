import { ConversationLogActorEnum } from '@/models/ai/enums/ConversationLogActorEnum';
import { Card } from '@/modules/application/components/DesignSystem';
import Spinner from '@/modules/common/components/animations/Spinner';
import PitchReplyForm from '@/modules/projects/components/PitchFlow/PitchReplyForm';
import usePitch from '@/modules/projects/hooks/usePitch';

import ConversationItemSystem from './ConversationItemSystem';
import ConversationItemUser from './ConversationItemUser';

const PitchFlowPitch = ({ flowData: { project } }: any) => {
  const { conversations, isLoading, getResponse } = usePitch(project.id);

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
        <PitchReplyForm onSubmit={getResponse} />
      </div>
    </Card>
  );
};

export default PitchFlowPitch;
