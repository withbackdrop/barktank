import { Text, Note } from '@/modules/application/components/DesignSystem';
import SlowText from '@/modules/common/components/SlowText';

const getColor = (probability: number) => {
  if (probability <= 50) {
    return 'red';
  }

  if (probability > 50 && probability <= 60) {
    return 'yellow';
  }

  if (probability > 60 && probability < 80) {
    return 'blue';
  }

  return 'green';
};

const ConversationItemSystem = ({ text, probability }) => (
  <Text tag="div">
    <strong>Bark: </strong>
    <SlowText speed={10} text={text} />
    <br />
    <Note color={getColor(probability)}>
      <strong>Probability to invest: </strong> {probability}%
    </Note>
  </Text>
);

export default ConversationItemSystem;
