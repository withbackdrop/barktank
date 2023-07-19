'use client';

import useFlow from '@/modules/application/hooks/useFlow';

import PitchFlowDecision from './steps/decision/PitchFlowDecision';
import PitchFlowPitch from './steps/pitch/PitchFlowPitch';
import PitchFlowStart from './steps/start/PitchFlowStart';
import steps from './utils/steps';

const PitchFlow = ({ project }) => {
  const handleGoToNextStep = (step, data = {}) => {
    handleGoToStep(step, data);
  };

  const { currentStep, handleGoToStep } = useFlow({
    steps: {
      [steps.START]: <PitchFlowStart onAccept={(data) => handleGoToNextStep(steps.ROUND_ONE, data)} />,
      [steps.ROUND_ONE]: (
        <PitchFlowPitch onAccept={(data) => handleGoToNextStep(steps.ROUND_TWO, data)} key={steps.ROUND_ONE} />
      ),
      [steps.ROUND_TWO]: (
        <PitchFlowPitch
          key={steps.ROUND_TWO}
          onAccept={(data) => handleGoToNextStep(steps.ROUND_THREE, data)}
          onReject={() => handleGoToNextStep(steps.ROUND_ONE)}
        />
      ),
      [steps.ROUND_THREE]: (
        <PitchFlowPitch
          key={steps.ROUND_THREE}
          onAccept={(data) => handleGoToNextStep(steps.DECISION, data)}
          onReject={() => handleGoToNextStep(steps.ROUND_TWO)}
        />
      ),
      [steps.DECISION]: <PitchFlowDecision />,
    },
    initialStep: steps.START,
    data: { project },
  });

  return currentStep;
};

export default PitchFlow;
