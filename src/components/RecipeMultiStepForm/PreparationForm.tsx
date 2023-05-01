import { useRecipeMultiStepForm } from '../../providers/RecipeMultiStepFormContext';

const PreparationForm = () => {
  const { step, recipeFormData, handleChange, next } = useRecipeMultiStepForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    next();
  };

  return (
    <form id={step.formId} className='form-container preparation-form' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='content'>Préparation</label>
        <textarea name='content' id='content' required value={recipeFormData.content} onChange={handleChange} />
      </div>
    </form>
  );
};

export default PreparationForm;
