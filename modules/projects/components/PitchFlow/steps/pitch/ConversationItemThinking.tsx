import barkAvatar from '@/images/bark-avatar-angry.png';
import { Avatar, Text } from '@/modules/application/components/DesignSystem';
import BouncingDots from '@/modules/common/components/animations/BouncingDots';

const ConversationItemThinking = ({ text = 'Mmmm...' }) => (
  <div className="mb-16 flex space-x-4">
    <Avatar src={barkAvatar} size="l" alt="Bark" />
    <div className="max-w-md space-y-6 self-start rounded-xl bg-zinc-100 p-4">
      <Text tag="div">
        <strong>Bark: </strong>
        <span className="mb-4 text-zinc-900">{text}</span>
      </Text>
      <BouncingDots size="s" />
    </div>
  </div>
);

export default ConversationItemThinking;
