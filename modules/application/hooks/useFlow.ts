'use client';

import { useState, cloneElement, useEffect } from 'react';

interface UseFlow {
  steps: any;
  initialStep: string;
  data?: any;
}

const useFlow = ({ steps, initialStep, data }: UseFlow) => {
  const [currentStep, setCurrentStep] = useState<string>(initialStep);
  const [flowData, setFlowData] = useState<any>(data || {});

  const handleGoToStep = (nextStep, stepData) => {
    setFlowData({ ...flowData, ...stepData });
    setCurrentStep(nextStep);
  };

  const handleGetStep = (step) => cloneElement(steps[step], { flowData } as any);

  useEffect(() => {
    if (!currentStep && initialStep) {
      setCurrentStep(initialStep);
    }
  }, [initialStep]);

  return { currentStep: currentStep ? handleGetStep(currentStep) : null, handleGoToStep };
};

export default useFlow;
