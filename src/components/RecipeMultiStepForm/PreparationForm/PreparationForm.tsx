import { css } from '../../../../styled-system/css';
import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';

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
          id='content'
          name='content'
          required
          value={recipeFormData.content}
          onChange={handleChange}
          className={css({
            bg: 'white',
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
