'use client';

import useFlow from '@/modules/application/hooks/useFlow';

import PitchFlowRoundOne from './steps/roundOne/PitchFlowRoundOne';
import PitchFlowStart from './steps/start/PitchFlowStart';
import steps from './utils/steps';

const PitchFlow = ({ project }) => {
  const handleGoToNextStep = (step, data = {}) => {
    handleGoToStep(step, data);
  };

  const { currentStep, handleGoToStep } = useFlow({
    steps: {
      [steps.START]: <PitchFlowStart onAccept={() => handleGoToNextStep(steps.ROUND_ONE)} />,
      [steps.ROUND_ONE]: <PitchFlowRoundOne onAccept={() => handleGoToNextStep(steps.ROUND_ONE)} />,
    },
    initialStep: steps.START,
    data: { project },
  });

  return currentStep;
};

export default PitchFlow;
