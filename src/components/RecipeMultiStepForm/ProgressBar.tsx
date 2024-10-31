import { useRecipeMultiStepForm } from '../../contexts/RecipeMultiStepFormContext';
import { flex } from '../../../styled-system/patterns';

import { ProgressBarStep } from './ProgressBarStep';

export const ProgressBar = () => {
  const {
    steps,
    currentStepIndex,
    completedStepIndexes,
    goTo,
    lastCompletedStepIndex,
  } = useRecipeMultiStepForm();

  return (
    <div
      className={flex({
        justify: 'center',
        pb: { base: '0', sm: '2rem' },
      })}
    >
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
