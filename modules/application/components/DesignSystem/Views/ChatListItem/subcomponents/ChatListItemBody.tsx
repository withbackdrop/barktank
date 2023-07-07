import { Text } from '@/modules/application/components/DesignSystem';

const ChatListItemBody = ({ children }: any) => (
  <Text color="gray-600" fontFamily="mono" size="s" tag="div">
    {children}
  </Text>
);

ChatListItemBody.role = 'ChatListItem.Body';
ChatListItemBody.displayName = 'ChatListItem.Body';

export default ChatListItemBody;
