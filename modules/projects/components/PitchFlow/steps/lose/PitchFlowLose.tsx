import Image from 'next/image';

import { getUrlHome } from '@/models/application/services/UrlService';
import { Button, Card, Heading, Stack } from '@/modules/application/components/DesignSystem';

const sadGifs = [
  'https://media.giphy.com/media/HSvpy6Jk396SI/giphy.gif',
  'https://media.giphy.com/media/H4oLWS4veh9kqxQ1z2/giphy.gif',
  'https://media.giphy.com/media/fqst7AVqF6AVLlYklE/giphy.gif',
  'https://media.giphy.com/media/ZEwVIoutuxqMueHIH8/giphy.gif',
  'https://media.giphy.com/media/L5WQjD4p8IpO0/giphy.gif',
  'https://media.giphy.com/media/xUPGcifQQyazq5yJPO/giphy.gif',
];

const PitchFlowLose = () => (
  <Card elevation="l" spacing="xl">
    <Stack alignItems="center" spacing="xxl">
      <Stack.Item>
        <Image
          src={sadGifs[Math.floor(Math.random() * sadGifs.length)]}
          alt="You lose!"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </Stack.Item>
      <Stack.Item>
        <Heading level={1} size="xxxl" textAlign="center">
          Woof, Bark Cuban said no...
        </Heading>
      </Stack.Item>
      <Stack.Item>
        <Button size="m" href={getUrlHome()}>
          Try again
        </Button>
      </Stack.Item>
    </Stack>
  </Card>
);

export default PitchFlowLose;
