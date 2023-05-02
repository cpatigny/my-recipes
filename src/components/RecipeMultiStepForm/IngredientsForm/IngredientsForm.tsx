import { MARKDOWN_MODE, NORMAL_MODE, useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';

import ModeSwitcher from './ModeSwitcher';
import ServingsMode from './ServingsMode';

const IngredientsForm = () => {
  const { step, recipeFormData, mode, setMode, handleChange, next } = useRecipeMultiStepForm();
  const { ingredients } = recipeFormData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    next();
  };

  return (
    <div className='form-container ingredients-form'>
      <ModeSwitcher mode={mode} setMode={setMode} />
      {mode === NORMAL_MODE && (
        <ServingsMode />
      )}
      {mode === MARKDOWN_MODE && typeof ingredients === 'string' && (
        <form id={step.formId} onSubmit={handleSubmit}>
          <div>
            <label htmlFor='ingredients'>Ingrédients</label>
            <textarea name='ingredients' id='ingredients' required value={ingredients} onChange={handleChange} />
          </div>
        </form>
      )}
    </div>
  );
};

export default IngredientsForm;
