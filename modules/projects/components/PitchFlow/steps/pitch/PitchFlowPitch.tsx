import { useEffect, useState } from 'react';

import { PitchInternalApiService } from '@/models/projects/services/internalApi/PitchInternalApiService';
import { Card, Text, Note } from '@/modules/application/components/DesignSystem';
import Spinner from '@/modules/common/components/animations/Spinner';
import SlowText from '@/modules/common/components/SlowText';
import PitchReplyForm from '@/modules/projects/components/PitchFlow/PitchReplyForm';

const PitchFlowPitch = ({ flowData: { project } }: any) => {
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const pitchInternalService = new PitchInternalApiService(true);
      const response = await pitchInternalService.getPitchResponse(project.id);
      setResult(response);
      setIsLoading(false);
    })();
  }, []);

  const handleGetNextResponse = async (text) => {
    const pitchInternalService = new PitchInternalApiService(true);
    const response = await pitchInternalService.getPitchResponse(project.id, text);
    console.log(response);
  };

  if (isLoading) {
    return (
      <Card elevation="l">
        <Spinner align="center" size="m" />
      </Card>
    );
  }

  return (
    <Card elevation="l">
      <div className="flex flex-col space-y-4">
        <Text tag="div">
          <strong>Bark: </strong>
          <SlowText speed={10} text={`${result.response[0].feedback} ${result.response[0].question}`} />
          <br />
          <Note color="blue">
            <strong>Probability to invest: </strong> {result.response[0].probability}%
          </Note>
        </Text>
        <PitchReplyForm onSubmit={handleGetNextResponse} />
      </div>
    </Card>
  );
};

export default PitchFlowPitch;
