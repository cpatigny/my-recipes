import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { RecipeIngredientWithId } from '../../../../types/recipe';

import { IngredientItem } from './IngredientItem';

interface SortableIngredientItemProps {
  ingredient: RecipeIngredientWithId;
  disabled?: boolean;
  deleteIngredient?: (key: string) => void;
  showEditIngredientForm?: (ingredient: RecipeIngredientWithId) => void;
}

export const SortableIngredientItem = ({
  disabled, ingredient, deleteIngredient, showEditIngredientForm,
}: SortableIngredientItemProps) => {
  const {
    setNodeRef,
    listeners,
    transform,
    transition,
    attributes,
    isDragging,
  } = useSortable({
    id: ingredient.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <IngredientItem
      ref={disabled ? undefined : setNodeRef}
      ingredient={ingredient}
      style={style}
      listeners={listeners}
      isOpacityEnabled={isDragging}
      deleteIngredient={deleteIngredient}
      showEditIngredientForm={showEditIngredientForm}
      {...attributes}
    />
  );
};
