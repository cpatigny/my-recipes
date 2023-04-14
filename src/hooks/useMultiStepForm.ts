import { ReactElement, useState } from 'react';

const useMultiStepForm = (steps: ReactElement[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

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
    steps,
    currentStepIndex,
    step: steps[currentStepIndex],
    isFirstStep,
    isLastStep,
    next,
    back,
    goTo,
  };
};

export default useMultiStepForm;
