import { useEffect, useState } from 'react';

export interface Step {
  title: string;
  formId: string;
}

export interface UseMultiStepFormReturn {
  steps: Step[];
  step: Step;
  currentStepIndex: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  next: () => void;
  back: () => void;
  goTo: (index: number) => void;
  completedStepIndexes: number[];
  lastCompletedStepIndex: number;
}

export const useMultiStepForm = (
  steps: Step[],
  isEditMode: boolean,
): UseMultiStepFormReturn => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepIndexes] = useState(steps.map((step, i) => i));
  const [completedStepIndexes, setCompletedStepIndexes] = useState<number[]>(
    [],
  );

  useEffect(() => {
    if (!isEditMode) return;
    setCompletedStepIndexes(stepIndexes);
  }, [isEditMode, stepIndexes]);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const step = steps[currentStepIndex];
  const lastCompletedStepIndex = Math.max(...completedStepIndexes);

  if (!step) {
    throw new Error(`step[${currentStepIndex}] doesn't exist`);
  }

  const next = () => {
    setCurrentStepIndex(i => {
      if (isLastStep) return i;
      return i + 1;
    });

    setCompletedStepIndexes([...completedStepIndexes, currentStepIndex]);
  };

  const back = () => {
    setCurrentStepIndex(i => {
      if (isFirstStep) return i;
      return i - 1;
    });
  };

  const goTo = (index: number) => {
    if (index < 0 || index > steps.length - 1) {
      throw new Error(
        `Invalid index. Index must between 0 and ${steps.length} (the number of steps of your form)`,
      );
    }

    setCurrentStepIndex(index);
  };

  return {
    steps,
    step,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    next,
    back,
    goTo,
    completedStepIndexes,
    lastCompletedStepIndex,
  };
};
