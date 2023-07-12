'use client';

import useFlow from '@/modules/application/hooks/useFlow';

import PitchFlowPitch from './steps/pitch/PitchFlowPitch';
import PitchFlowStart from './steps/start/PitchFlowStart';
import steps from './utils/steps';

const PitchFlow = ({ project }) => {
  const handleGoToNextStep = (step, data = {}) => {
    handleGoToStep(step, data);
  };

  const { currentStep, handleGoToStep } = useFlow({
    steps: {
      [steps.START]: <PitchFlowStart onAccept={() => handleGoToNextStep(steps.PITCH)} />,
      [steps.PITCH]: <PitchFlowPitch />,
    },
    initialStep: steps.START,
    data: { project },
  });

  return currentStep;
};

export default PitchFlow;
