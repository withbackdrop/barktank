import { Text } from '@/modules/application/components/DesignSystem';

const ConversationItemUser = ({ text }) => (
  <Text tag="div">
    <strong>You: </strong>
    {text}
  </Text>
);

export default ConversationItemUser;
