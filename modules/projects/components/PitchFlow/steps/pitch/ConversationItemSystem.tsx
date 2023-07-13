import { Text, Note } from '@/modules/application/components/DesignSystem';
import SlowText from '@/modules/common/components/SlowText';

const ConversationItemSystem = ({ text, probability }) => (
  <Text tag="div">
    <strong>Bark: </strong>
    <SlowText speed={10} text={text} />
    <br />
    <Note color="blue">
      <strong>Probability to invest: </strong> {probability}%
    </Note>
  </Text>
);

export default ConversationItemSystem;
