import { Text } from '@/modules/application/components/DesignSystem';

const ChatListItemSubject = ({ children }: any) => (
  <Text tag="span" fontWeight="semibold" size="s">
    {children}
  </Text>
);

ChatListItemSubject.role = 'ChatListItem.Subject';
ChatListItemSubject.displayName = 'ChatListItem.Subject';

export default ChatListItemSubject;
