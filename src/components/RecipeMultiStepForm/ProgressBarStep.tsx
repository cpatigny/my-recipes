import { Step } from '../../hooks/useMultiStepForm';

interface ProgressBarStepProps {
  step: Step;
  currentStepIndex: number;
  index: number;
  completedStepIndexes: number[];
  goTo: (index: number) => void;
  lastCompletedStepIndex: number;
}

const ProgressBarStep = ({
  step, currentStepIndex, index, completedStepIndexes, goTo, lastCompletedStepIndex,
}: ProgressBarStepProps) => {
  const isCurrentStep = index === currentStepIndex;
  const stepIsCompleted = completedStepIndexes.includes(index);

  let classNames = isCurrentStep ? 'active' : '';
  classNames += stepIsCompleted && !isCurrentStep ? ' completed' : '';

  const onClickIsEnabled = stepIsCompleted || index === lastCompletedStepIndex + 1;

  const handleClick = () => goTo(index);

  return (
    <div className={`progress-bar-step ${classNames}`}>
      {index !== 0 && (
        <div className='progress-bar-bar'></div>
      )}
      <div className='wrapper'>
        <button className='step-index' onClick={onClickIsEnabled ? handleClick : undefined}>
          { index + 1 }
        </button>
        <span className='progress-bar-step-title'>{ step.title }</span>
      </div>
    </div>
  );
};

export default ProgressBarStep;
