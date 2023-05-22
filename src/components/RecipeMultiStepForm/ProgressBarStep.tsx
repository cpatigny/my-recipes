import { Step } from '../../hooks/useMultiStepForm';

interface ProgressBarStepProps {
  step: Step;
  currentStepIndex: number;
  index: number;
  completedStepIndexes: number[];
  goTo: (index: number) => void;
  lastCompletedStepIndex: number;
}

export const ProgressBarStep = ({
  step, currentStepIndex, index, completedStepIndexes, goTo, lastCompletedStepIndex,
}: ProgressBarStepProps) => {
  const isCurrentStep = index === currentStepIndex;
  const stepIsCompleted = completedStepIndexes.includes(index);
  const isNextStepToComplete = index === lastCompletedStepIndex + 1;

  let classNames = isCurrentStep ? 'active' : '';
  classNames += stepIsCompleted ? ' completed' : '';

  const isClickEnabled = (stepIsCompleted || isNextStepToComplete) && !isCurrentStep;

  const handleClick = () => goTo(index);

  return (
    <div className={`progress-bar-step ${classNames}`}>
      {index !== 0 && (
        <div className='progress-bar-bar'></div>
      )}
      <div className='wrapper'>
        <button className={`step-index ${isClickEnabled ? '' : 'disabled'}`} onClick={isClickEnabled ? handleClick : undefined}>
          <span>{ index + 1 }</span>
        </button>
        <span className='progress-bar-step-title'>{ step.title }</span>
      </div>
    </div>
  );
};
