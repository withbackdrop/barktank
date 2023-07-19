import { Avatar, Text } from '@/modules/application/components/DesignSystem';

const ConversationItemUser = ({ text }) => (
  <div className="flex w-full justify-end space-x-4">
    <div className="max-w-sm self-start rounded-xl bg-blue-600 p-4 text-white">
      <Text tag="div" color="inherit">
        <strong>You: </strong>
        {text}
      </Text>
    </div>
    <span className="hidden md:block">
      <Avatar size="l" alt="You" />
    </span>
  </div>
);

export default ConversationItemUser;
