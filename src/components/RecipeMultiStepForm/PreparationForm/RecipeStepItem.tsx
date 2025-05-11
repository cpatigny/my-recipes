import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { css } from '../../../../styled-system/css';
import { center, flex } from '../../../../styled-system/patterns';
import { PreparationStep, PreparationStepWithId } from '../../../types/recipe';
import { Button } from '../../Button';
import { Icon } from '../../Icon';

export interface RecipeStepItemProps {
  recipeStep: PreparationStep;
  id: string;
  setStepToEdit: React.Dispatch<
    React.SetStateAction<PreparationStepWithId | null>
  >;
  deleteStep: (id: string) => void;
  style?: React.CSSProperties;
  isOverlayDragging?: boolean;
}

export const RecipeStepItem = ({
  recipeStep,
  id,
  setStepToEdit,
  deleteStep,
  style,
  isOverlayDragging,
}: RecipeStepItemProps) => {
  const {
    setNodeRef,
    listeners,
    transform,
    transition,
    attributes,
    isDragging,
  } = useSortable({
    id,
  });

  const styles: React.CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
    ...style,
  };

  return (
    <li
      ref={setNodeRef}
      style={styles}
      {...attributes}
      className={flex({
        align: 'center',
        justify: 'space-between',
        listStyle: 'none',
        bg: 'white',
        rounded: '0.8rem',
        shadow:
          '0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(34, 33, 81, 0.15)',
        w: '100%',
        '&:not(:last-child)': {
          mb: '1rem',
        },
      })}
    >
      <p
        {...listeners}
        style={{ cursor: isOverlayDragging ? 'grabbing' : 'grab' }}
        className={css({
          fontSize: '1rem',
          color: 'black',
          p: '0.55rem 0 0.55rem 1.1rem',
          w: '100%',
        })}
      >
        {recipeStep.content}
      </p>

      <div className={center({ gap: '0 0.4rem', px: '1.1rem' })}>
        <Button
          circle={true}
          visual='grey'
          color='edit'
          type='button'
          onClick={() => setStepToEdit({ ...recipeStep, id })}
        >
          <Icon name='edit' fontSize='1.2rem' />
        </Button>
        <Button
          circle={true}
          visual='grey'
          color='danger'
          type='button'
          onClick={() => deleteStep(id)}
        >
          <Icon name='clear' fontSize='1.2rem' />
        </Button>
      </div>
    </li>
  );
};
