import { Card, Text, Heading, Button } from '@/modules/application/components/DesignSystem';

const PitchFlowStart = ({ flowData: { project }, onAccept }: any) => (
  <Card elevation="l">
    <div className="flex space-x-16">
      <div className="flex min-w-fit flex-col items-center justify-center">
        <Heading textAlign="center" size="xxl" spacing="s">
          Welcome to the Bark Tank
        </Heading>
        <Text textAlign="center" size="xxl" spacing="l">
          Let's raise the woof!
        </Text>
        <Button size="l" onClick={onAccept}>
          Let's Go!
        </Button>
      </div>
      <div>
        <Heading textAlign="left" size="xl" spacing="l">
          Your project pitch
        </Heading>
        <Text textAlign="left" size="xl" spacing="xs">
          <strong>Name: </strong>
          {project.name}
        </Text>
        {project.description && (
          <Text textAlign="left" size="xl" spacing="xs">
            <strong>Description: </strong>
            {project.description}
          </Text>
        )}
        <Text textAlign="left" size="xl" spacing="xs">
          <strong>Pitch video: </strong>
          {project.youtubeUrl}
        </Text>
      </div>
    </div>
  </Card>
);

export default PitchFlowStart;
