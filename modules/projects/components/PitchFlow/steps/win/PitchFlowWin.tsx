import { useEffect } from 'react';

import Confetti from 'canvas-confetti';
import Image from 'next/image';

import { Card, Heading, Stack } from '@/modules/application/components/DesignSystem';

const moneyGifs = [
  'https://media.giphy.com/media/3o6gDWzmAzrpi5DQU8/giphy.gif',
  'https://media.giphy.com/media/67ThRZlYBvibtdF9JH/giphy.gif',
  'https://media.giphy.com/media/l0Ex6kAKAoFRsFh6M/giphy.gif',
  'https://media.giphy.com/media/l0HFkA6omUyjVYqw8/giphy.gif',
  'https://media.giphy.com/media/MFsqcBSoOKPbjtmvWz/giphy.gif',
];

const PitchFlowWin = () => {
  useEffect(() => {
    Confetti({
      spread: 300,
      particleCount: 250,
      ticks: 300,
    });
  }, []);

  return (
    <Card elevation="l">
      <Stack alignItems="center">
        <Stack.Item>
          <Image
            src={moneyGifs[Math.floor(Math.random() * moneyGifs.length)]}
            alt="You win!"
            width={500}
            height={500}
          />
        </Stack.Item>
        <Stack.Item>
          <Heading level={1} size="xxxl">
            Great job!
          </Heading>
        </Stack.Item>
      </Stack>
    </Card>
  );
};

export default PitchFlowWin;
