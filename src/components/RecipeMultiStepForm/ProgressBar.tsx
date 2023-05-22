import { useRecipeMultiStepForm } from '../../contexts/RecipeMultiStepFormContext';

import { ProgressBarStep } from './ProgressBarStep';

export const ProgressBar = () => {
  const {
    steps, currentStepIndex, completedStepIndexes, goTo, lastCompletedStepIndex,
  } = useRecipeMultiStepForm();

  return (
    <div className='progress-bar'>
      {steps.map((step, index) => (
        <ProgressBarStep
          key={index}
          step={step}
          currentStepIndex={currentStepIndex}
          index={index}
          completedStepIndexes={completedStepIndexes}
          goTo={goTo}
          lastCompletedStepIndex={lastCompletedStepIndex}
        />
      ))}
    </div>
  );
};
