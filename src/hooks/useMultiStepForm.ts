import { useState } from 'react';

export interface Step {
  element: JSX.Element;
  title: string;
  formId: string;
}

export interface useMultiStepFormReturn {
  step: Step;
  currentStepIndex: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  next: () => void;
  back: () => void;
  goTo: (index: number) => void;
}

const useMultiStepForm = (steps: Step[]): useMultiStepFormReturn => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const step = steps[currentStepIndex];

  if (!step) {
    throw new Error(`step[${currentStepIndex}] doesn't exist`);
  }

  const next = () => {
    setCurrentStepIndex(i => {
      if (isLastStep) return i;
      return i + 1;
    });
  };

  const back = () => {
    setCurrentStepIndex(i => {
      if (isFirstStep) return i;
      return i - 1;
    });
  };

  const goTo = (index: number) => {
    if (index < 0 || index > steps.length - 1) {
      throw new Error(`Invalid index. Index must between 0 and ${steps.length} (the number of steps of your form)`);
    }

    setCurrentStepIndex(index);
  };

  return {
    step,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    next,
    back,
    goTo,
  };
};

export default useMultiStepForm;
