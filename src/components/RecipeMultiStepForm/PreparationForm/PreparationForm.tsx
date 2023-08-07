import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';
import { css } from '../../../../styled-system/css';

export const PreparationForm = () => {
  const { step, recipeFormData, handleChange, next } = useRecipeMultiStepForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    next();
  };

  return (
    <form id={step.formId} onSubmit={handleSubmit}>
      <div>
        <label htmlFor='content'>Préparation</label>
        <textarea
          name='content'
          required
          value={recipeFormData.content}
          onChange={handleChange}
          className={css({
            w: '100%',
            h: '37.5rem',
            rounded: '0.5rem',
            p: '0.6rem',
            border: '1px solid #e9e9e9',
            outline: 'none',
            _focus: {
              borderColor: 'primary',
            },
          })}
        />
      </div>
    </form>
  );
};
