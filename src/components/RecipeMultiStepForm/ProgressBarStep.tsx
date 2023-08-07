import { css } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';

import { Step } from '../../hooks/useMultiStepForm';

const darkerPrimary = 'orange.550';
const lighterPrimary = 'orange.400';

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
  const isClickEnabled = (stepIsCompleted || isNextStepToComplete) && !isCurrentStep;

  const handleClick = () => goTo(index);

  return (
    <div
      data-active={isCurrentStep}
      data-completed={stepIsCompleted}
      className={flex({ align: 'center' })}
    >
      {index !== 0 && (
        <div
          className={css({
            h: '2px',
            rounded: 'full',
            bg: '#e0e0e0',
            transitionDuration: '200ms',
            w: { base: '12vw', sm: '4rem', md: '7rem' },
            m: { base: '0.1rem', sm: '0 0.2rem', md: '0 0.3rem' },
            '[data-active=true] &, [data-completed=true] &': {
              bg: lighterPrimary,
            },
          })}
        />
      )}
      <div className={css({ pos: 'relative' })}>
        <button
          data-disabled={!isClickEnabled}
          onClick={isClickEnabled ? handleClick : undefined}
          className={css({
            p: '0.19rem',
            rounded: 'full',
            border: '2px solid transparent',
            '[data-disabled=true]&': {
              cursor: 'default',
            },
            '[data-completed=true][data-active=true] &': {
              borderColor: lighterPrimary,
            },
          })}
        >
          <span
            className={flex({
              justify: 'center',
              align: 'center',
              w: { base: '2rem', md: '2.4rem' },
              h: { base: '2rem', md: '2.4rem' },
              rounded: 'full',
              border: '3px solid #e0e0e0',
              color: '#b4b4b4',
              transitionDuration: '200ms',
              '[data-completed=true] &': {
                borderColor: lighterPrimary,
                bg: lighterPrimary,
                color: 'white',
                _hover: {
                  borderColor: darkerPrimary,
                  bg: darkerPrimary,
                },
              },
              '[data-active=true] &': {
                borderColor: lighterPrimary,
                color: darkerPrimary,
              },
              '[data-completed=true][data-active=true] &': {
                color: 'white',
              },
            })}
          >
            { index + 1 }
          </span>
        </button>
        <span
          className={css({
            display: { base: 'none', sm: 'block' },
            pos: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translate(-50%, calc(100% + 0.6rem))',
          })}
        >
          { step.title }
        </span>
      </div>
    </div>
  );
};
