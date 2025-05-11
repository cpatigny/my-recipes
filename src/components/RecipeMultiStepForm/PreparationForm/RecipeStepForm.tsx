import { useState } from 'react';
import { css } from '../../../../styled-system/css';
import { flex } from '../../../../styled-system/patterns';
import { PreparationStepWithId } from '../../../types/recipe';
import { Button } from '../../Button';
import { CancelBtn } from '../../CancelBtn';

interface RecipeStepFormProps {
  step: PreparationStepWithId;
  editStep: (id: string, newContent: string) => void;
  closeModal: () => void;
}

export const RecipeStepForm = ({
  step,
  editStep,
  closeModal,
}: RecipeStepFormProps) => {
  const [stepContent, setStepContent] = useState(step.content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editStep(step.id, stepContent);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='step'>Étape</label>
      <textarea
        id='step'
        name='step'
        value={stepContent}
        onChange={e => setStepContent(e.target.value)}
        required
        className={css({
          bg: 'white',
          w: '100%',
          h: '10rem',
          rounded: '0.5rem',
          p: '0.6rem',
          border: '1px solid #e9e9e9',
          outline: 'none',
          _focus: {
            borderColor: 'primary',
          },
        })}
      />
      <div className={flex({ align: 'center', gap: '0 0.5rem', mt: '0.8rem' })}>
        <Button size='md' type='submit'>
          Modifier
        </Button>
        <CancelBtn onClick={closeModal} text='Annuler' />
      </div>
    </form>
  );
};
