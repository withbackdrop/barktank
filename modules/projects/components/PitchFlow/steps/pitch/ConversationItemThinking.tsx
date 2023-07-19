import barkAvatar from '@/images/bark-avatar-angry.png';
import { Avatar, Text } from '@/modules/application/components/DesignSystem';
import Spinner from '@/modules/common/components/animations/Spinner';

const ConversationItemThinking = ({ text = 'Mmmm...' }) => (
  <div className="mb-16 flex space-x-4">
    <Avatar src={barkAvatar} size="l" alt="Bark" />
    <div className="max-w-md space-y-6 self-start rounded-xl bg-zinc-100 p-4">
      <Text tag="div">
        <strong>Bark: </strong>
        <span className="mb-4 text-zinc-900">{text}</span>
      </Text>
      <Spinner size="s" align="left" />
    </div>
  </div>
);

export default ConversationItemThinking;
