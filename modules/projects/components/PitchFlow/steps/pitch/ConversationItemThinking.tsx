import barkAvatar from '@/images/bark-avatar-angry.png';
import { Avatar } from '@/modules/application/components/DesignSystem';

const ConversationItemThinking = () => (
  <div className="flex space-x-4">
    <Avatar src={barkAvatar} size="l" />
    <div className="max-w-md self-start rounded-xl bg-zinc-100 px-4 py-1">
      <div className="animate-bounce text-3xl font-bold text-orange-500">...</div>
    </div>
  </div>
);

export default ConversationItemThinking;
