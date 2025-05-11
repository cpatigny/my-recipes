import { useState } from 'react';
import { css } from '../../../../styled-system/css';
import { center, flex } from '../../../../styled-system/patterns';
import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';
import { useToast } from '../../../contexts/ToastContext';
import { getNewItemPosition } from '../../../helpers/helpers';
import { generateStepKey } from '../../../helpers/step.helpers';
import { Block } from '../../Block';
import { Button } from '../../Button';
import { Icon } from '../../Icon';

export const PreparationForm = () => {
  const [stepContent, setStepContent] = useState('');

  const { step, recipeFormData, setRecipeFormData, next, recipeId } =
    useRecipeMultiStepForm();
  const { toast } = useToast();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(recipeFormData.steps).length === 0) {
      toast.error('Veuillez ajouter au moins une étape');
      return;
    }

    next();
  };

  const addStep = (e: React.FormEvent) => {
    e.preventDefault();

    if (stepContent.length > 0) {
      const newStepKey = generateStepKey(recipeId);

      setRecipeFormData(draft => {
        draft.steps[newStepKey] = {
          position: getNewItemPosition(draft.steps),
          content: stepContent,
        };
      });

      setStepContent('');
    }
  };

  const deleteStep = (id: string) => {
    setRecipeFormData(draft => {
      delete draft.steps[id];
    });
  };

  return (
    <>
      <Block>
        <h3
          className={css({
            fontWeight: 'bold',
            fontSize: '1.1rem',
            mb: '0.5rem',
          })}
        >
          Ajouter une étape
        </h3>
        <form onSubmit={addStep}>
          <div>
            <label htmlFor='step'>Étape</label>
            <textarea
              id='step'
              name='step'
              value={stepContent}
              onChange={e => setStepContent(e.target.value)}
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
          </div>
          <Button size='md' mt='0.6rem' type='submit'>
            Ajouter une étape
          </Button>
        </form>
      </Block>
      <form id={step.formId} aria-hidden={true} onSubmit={handleNextStep} />
      <Block>
        <h3 className={css({ fontWeight: 'bold', fontSize: '1.1rem' })}>
          liste des étapes
        </h3>
        <ul className={css({ mt: '1rem' })}>
          {Object.keys(recipeFormData.steps).map(key => (
            <li
              key={key}
              className={flex({
                align: 'center',
                justify: 'space-between',
                listStyle: 'none',
                bg: 'white',
                p: '0.55rem 1.1rem 0.55rem 1.1rem',
                rounded: '0.8rem',
                shadow:
                  '0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(34, 33, 81, 0.15)',
                w: '100%',
                '&:not(:last-child)': {
                  mb: '1rem',
                },
              })}
            >
              {recipeFormData.steps[key]?.content}

              <div className={center({ gap: '0 0.4rem' })}>
                <Button circle={true} visual='grey' color='edit' type='button'>
                  <Icon name='edit' fontSize='1.2rem' />
                </Button>
                <Button
                  circle={true}
                  visual='grey'
                  color='danger'
                  type='button'
                  onClick={() => deleteStep(key)}
                >
                  <Icon name='clear' fontSize='1.2rem' />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Block>
    </>
  );
};
