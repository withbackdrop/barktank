import barkAvatar from '@/images/bark-avatar-angry.png';
import { Text, Avatar } from '@/modules/application/components/DesignSystem';
import SlowText from '@/modules/common/components/SlowText';

import Heartbeat from './Heartbeat';

const ConversationItemSystem = ({ text, probability, isLastAnswer }) => (
  <div className="flex flex-col space-x-4 space-y-4 md:flex-row">
    <div className="flex flex-col items-center">
      <Avatar src={barkAvatar} size="l" alt="Bark" />
      {isLastAnswer && <Heartbeat probability={probability} />}
    </div>

    <div className="max-w-sm self-start rounded-xl bg-zinc-100 p-4">
      <Text tag="div">
        <strong>Bark: </strong>
        <SlowText speed={5} text={text} />
      </Text>
    </div>
  </div>
);

export default ConversationItemSystem;
