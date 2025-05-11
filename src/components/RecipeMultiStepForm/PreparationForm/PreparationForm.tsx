import { useState } from 'react';
import { css } from '../../../../styled-system/css';
import { center, flex } from '../../../../styled-system/patterns';
import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';
import { useToast } from '../../../contexts/ToastContext';
import { getNewItemPosition } from '../../../helpers/helpers';
import { generateStepKey } from '../../../helpers/step.helpers';
import { PreparationStepWithId } from '../../../types/recipe';
import { Block } from '../../Block';
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { MyDialog } from '../../Modal/MyDialog';
import { MyModal } from '../../Modal/MyModal';
import { MyModalHeading } from '../../Modal/MyModalHeading';
import { MyMotionModalOverlay } from '../../Modal/MyMotionModalOverlay';
import { SecondaryText } from '../../SecondaryText';
import { RecipeStepForm } from './RecipeStepForm';

export const PreparationForm = () => {
  const [stepContent, setStepContent] = useState('');
  const [stepToEdit, setStepToEdit] = useState<PreparationStepWithId | null>(
    null,
  );

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

  const editStep = (id: string, newContent: string) => {
    setRecipeFormData(draft => {
      const stepToUpdate = draft.steps[id];
      if (!stepToUpdate) return;
      stepToUpdate.content = newContent;
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
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  addStep(e);
                }
              }}
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
        {Object.keys(recipeFormData.steps).length > 0 ? (
          <ul className={css({ mt: '1rem' })}>
            {Object.keys(recipeFormData.steps).map(key => {
              const recipeStep = recipeFormData.steps[key];
              if (!recipeStep) return;

              return (
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
                  {recipeStep.content}

                  <div className={center({ gap: '0 0.4rem' })}>
                    <Button
                      circle={true}
                      visual='grey'
                      color='edit'
                      type='button'
                      onClick={() => setStepToEdit({ ...recipeStep, id: key })}
                    >
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
              );
            })}
          </ul>
        ) : (
          <SecondaryText>Aucune étape n'a été ajoutée</SecondaryText>
        )}
      </Block>
      <MyMotionModalOverlay
        isOpen={!!stepToEdit}
        onOpenChange={isOpen => {
          if (!isOpen) setStepToEdit(null);
        }}
      >
        <MyModal>
          <MyDialog>
            {({ close }) => (
              <>
                <MyModalHeading>Modifier l'étape</MyModalHeading>
                {stepToEdit && (
                  <RecipeStepForm
                    step={stepToEdit}
                    editStep={editStep}
                    closeModal={() => {
                      setStepToEdit(null);
                      close();
                    }}
                  />
                )}
              </>
            )}
          </MyDialog>
        </MyModal>
      </MyMotionModalOverlay>
    </>
  );
};
