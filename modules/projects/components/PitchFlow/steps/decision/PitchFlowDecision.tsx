import { useEffect } from 'react';

import Confetti from 'canvas-confetti';
import Image from 'next/image';

import { Card, Text } from '@/modules/application/components/DesignSystem';
import ConversationItemSystem from '@/modules/projects/components/PitchFlow/steps/pitch/ConversationItemSystem';
import ConversationItemThinking from '@/modules/projects/components/PitchFlow/steps/pitch/ConversationItemThinking';
import { PROBABILITY_PITCH_ACCEPT } from '@/modules/projects/components/PitchFlow/utils/constants';
import usePitchDecision from '@/modules/projects/hooks/usePitchDecision';

const moneyGifs = [
  'https://media.giphy.com/media/3o6gDWzmAzrpi5DQU8/giphy.gif',
  'https://media.giphy.com/media/67ThRZlYBvibtdF9JH/giphy.gif',
  'https://media.giphy.com/media/l0Ex6kAKAoFRsFh6M/giphy.gif',
  'https://media.giphy.com/media/l0HFkA6omUyjVYqw8/giphy.gif',
  'https://media.giphy.com/media/MFsqcBSoOKPbjtmvWz/giphy.gif',
];

const sadGifs = [
  'https://media.giphy.com/media/HSvpy6Jk396SI/giphy.gif',
  'https://media.giphy.com/media/H4oLWS4veh9kqxQ1z2/giphy.gif',
  'https://media.giphy.com/media/fqst7AVqF6AVLlYklE/giphy.gif',
  'https://media.giphy.com/media/ZEwVIoutuxqMueHIH8/giphy.gif',
  'https://media.giphy.com/media/L5WQjD4p8IpO0/giphy.gif',
  'https://media.giphy.com/media/xUPGcifQQyazq5yJPO/giphy.gif',
];

const PitchFlowDecision = ({ flowData: { project, difficulty } }: any) => {
  const { conversation, isThinking } = usePitchDecision(project.id, difficulty);

  useEffect(() => {
    if (conversation && conversation.probability >= PROBABILITY_PITCH_ACCEPT) {
      Confetti({
        spread: 300,
        particleCount: 250,
        ticks: 300,
      });
    }
  }, [conversation]);

  if (isThinking) {
    return (
      <Card elevation="l">
        <ConversationItemThinking />
      </Card>
    );
  }

  return (
    <Card elevation="l" isOverflowHidden={true}>
      <div className="flex flex-col space-y-8">
        <ConversationItemSystem
          text={conversation.decision}
          probability={conversation.probability}
          isLastAnswer={false}
        />

        {conversation.probability >= PROBABILITY_PITCH_ACCEPT && (
          <div className="flex flex-col space-y-4">
            <Text size="l">{conversation.price}</Text>
            <Image
              src={moneyGifs[Math.floor(Math.random() * moneyGifs.length)]}
              alt="You win!"
              width={500}
              height={500}
            />
          </div>
        )}
        {conversation.probability < PROBABILITY_PITCH_ACCEPT && (
          <Image src={sadGifs[Math.floor(Math.random() * moneyGifs.length)]} alt="You lose!" width={500} height={500} />
        )}
      </div>
    </Card>
  );
};

export default PitchFlowDecision;
