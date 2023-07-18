'use client';

import useFlow from '@/modules/application/hooks/useFlow';

import PitchFlowLose from './steps/lose/PitchFlowLose';
import PitchFlowPitch from './steps/pitch/PitchFlowPitch';
import PitchFlowStart from './steps/start/PitchFlowStart';
import PitchFlowWin from './steps/win/PitchFlowWin';
import steps from './utils/steps';

const PitchFlow = ({ project }) => {
  const handleGoToNextStep = (step, data = {}) => {
    handleGoToStep(step, data);
  };

  const { currentStep, handleGoToStep } = useFlow({
    steps: {
      [steps.START]: <PitchFlowStart onAccept={(data) => handleGoToNextStep(steps.PITCH, data)} />,
      [steps.PITCH]: (
        <PitchFlowPitch
          onAccept={(data) => handleGoToNextStep(steps.WIN, data)}
          onReject={(data) => handleGoToNextStep(steps.LOSE, data)}
        />
      ),
      [steps.WIN]: <PitchFlowWin />,
      [steps.LOSE]: <PitchFlowLose />,
    },
    initialStep: steps.START,
    data: { project },
  });

  return currentStep;
};

export default PitchFlow;
