import { css } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';
import { useRecipeMultiStepForm } from '../contexts/RecipeMultiStepFormContext';
import { Button } from './Button';

interface MultiStepFormActionsProps {
  submitForm: () => void;
}

export const MultiStepFormActions = ({ submitForm }: MultiStepFormActionsProps) => {
  const { step, isEditMode, isFirstStep, isLastStep, back } = useRecipeMultiStepForm();

  return (
    <div className={flex({ justify: 'space-between', gap: '0 0.5rem', m: '1.6rem 0 2rem' })}>
      {!isFirstStep && (
        <Button size='md' visual='outline' onClick={back}>Précédent</Button>
      )}
      {!isLastStep && (
        <Button size='md' className={css({ ml: 'auto' })} type='submit' form={step.formId}>
          Suivant
        </Button>
      )}
      {isLastStep && (
        <Button size='md' type='button' onClick={submitForm}>
          { isEditMode ? 'Modifier la recette' : 'Créer la recette' }
        </Button>
      )}
    </div>
  );
};
