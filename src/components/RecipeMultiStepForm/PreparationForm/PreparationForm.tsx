import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { css } from '../../../../styled-system/css';
import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';
import { useToast } from '../../../contexts/ToastContext';
import {
  getNewItemPosition,
  sortItemsByPosition,
} from '../../../helpers/helpers';
import {
  convertStepsObjectToArray,
  generateStepKey,
} from '../../../helpers/step.helpers';
import {
  PreparationStep,
  PreparationSteps,
  PreparationStepWithId,
} from '../../../types/recipe';
import { Block } from '../../Block';
import { Button } from '../../Button';
import { MyDialog } from '../../Modal/MyDialog';
import { MyModal } from '../../Modal/MyModal';
import { MyModalHeading } from '../../Modal/MyModalHeading';
import { MyMotionModalOverlay } from '../../Modal/MyMotionModalOverlay';
import { SecondaryText } from '../../SecondaryText';
import { RecipeStepForm } from './RecipeStepForm';
import { RecipeStepItem, RecipeStepItemProps } from './RecipeStepItem';

interface RecipeStepItemOverlay
  extends Omit<RecipeStepItemProps, 'recipeStep'> {
  recipeStep?: PreparationStep;
}

const RecipeStepItemOverlay = ({
  recipeStep,
  id,
  setStepToEdit,
  deleteStep,
}: RecipeStepItemOverlay) => {
  if (!recipeStep) return null;

  return (
    <RecipeStepItem
      id={id}
      deleteStep={deleteStep}
      recipeStep={recipeStep}
      setStepToEdit={setStepToEdit}
      style={{
        transform: 'scale(1.05)',
        boxShadow: '0 19px 38px rgba(0,0,0,0.20), 0 15px 12px rgba(0,0,0,0.15)',
      }}
      isOverlayDragging
    />
  );
};

export const PreparationForm = () => {
  const [stepContent, setStepContent] = useState('');
  const [stepToEdit, setStepToEdit] = useState<PreparationStepWithId | null>(
    null,
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

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

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      return;
    }

    const stepIds: UniqueIdentifier[] = recipeSteps.map(step => step.id);

    const oldIndex = stepIds.indexOf(active.id);
    const newIndex = stepIds.indexOf(over.id);
    const updatedStepOrder = arrayMove(stepIds, oldIndex, newIndex);

    const updatedSteps: PreparationSteps = {};
    updatedStepOrder.forEach((id, index) => {
      const recipeStep = recipeFormData.steps[id];
      if (!recipeStep) {
        return;
      }
      updatedSteps[id] = { ...recipeStep, position: index };
    });

    setRecipeFormData(draft => {
      draft.steps = updatedSteps;
    });

    setActiveId(null);
  };

  const recipeSteps = sortItemsByPosition(
    convertStepsObjectToArray(recipeFormData.steps),
  );

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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
        {recipeSteps.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            onDragStart={e => setActiveId(e.active.id)}
          >
            <SortableContext
              items={recipeSteps}
              strategy={verticalListSortingStrategy}
            >
              <ul className={css({ mt: '1rem' })}>
                {recipeSteps.map(recipeStep => (
                  <RecipeStepItem
                    key={recipeStep.id}
                    recipeStep={recipeStep}
                    id={recipeStep.id}
                    deleteStep={deleteStep}
                    setStepToEdit={setStepToEdit}
                  />
                ))}
              </ul>
            </SortableContext>
            <DragOverlay>
              {activeId && (
                <RecipeStepItemOverlay
                  id={activeId as string}
                  recipeStep={recipeFormData.steps[activeId]}
                  deleteStep={deleteStep}
                  setStepToEdit={setStepToEdit}
                />
              )}
            </DragOverlay>
          </DndContext>
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
