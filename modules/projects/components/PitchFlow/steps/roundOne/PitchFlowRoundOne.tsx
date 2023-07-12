import { useEffect, useState } from 'react';

import { PitchInternalApiService } from '@/models/projects/services/internalApi/PitchInternalApiService';
import { Card } from '@/modules/application/components/DesignSystem';
import Spinner from '@/modules/common/components/animations/Spinner';
import SlowText from '@/modules/common/components/SlowText';
import PitchReplyForm from '@/modules/projects/components/PitchFlow/PitchReplyForm';

const PitchFlowRoundOne = ({ flowData: { project }, onAccept }: any) => {
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

  if (isLoading) {
    return (
      <Card elevation="l">
        <Spinner align="center" />
      </Card>
    );
  }

  return (
    <Card elevation="l">
      <div className="mb-10">
        <SlowText speed={20} text={`${result.response[0].feedback} ${result.response[0].question}`} />
      </div>
      <PitchReplyForm onSubmit={(text) => console.log(text)} />
    </Card>
  );
};

export default PitchFlowRoundOne;
