import { useRecipeMultiStepForm } from '../../providers/RecipeMultiStepFormContext';

interface MultiStepFormActionsProps {
  submitForm: () => void;
}

const MultiStepFormActions = ({ submitForm }: MultiStepFormActionsProps) => {
  const { step, isEditMode, isFirstStep, isLastStep, back } = useRecipeMultiStepForm();

  return (
    <div className='step-actions'>
      { !isFirstStep && <button className='previous btn-outline' onClick={back}>Précédent</button> }
      { !isLastStep && <button className='btn-primary' type='submit' form={step.formId}>Suivant</button> }
      { isLastStep && (
        <button className='btn-primary' type='button' onClick={submitForm}>
          { isEditMode ? 'Modifier la recette' : 'Créer la recette' }
        </button>
      )}
    </div>
  );
};

export default MultiStepFormActions;