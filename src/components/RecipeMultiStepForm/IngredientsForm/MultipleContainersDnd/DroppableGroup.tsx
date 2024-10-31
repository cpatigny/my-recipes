import {
  GroupWithId,
  GroupWithIngredients,
  RecipeIngredientWithId,
} from '../../../../types/recipe';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableIngredientItem } from './SortableIngredientItem';
import { DroppableContainer } from './DroppableContainer';

interface DroppableGroupProps {
  group: GroupWithIngredients;
  isSortingContainer: boolean;
  handleDelete: (group: GroupWithIngredients) => void;
  deleteIngredient?: (key: string) => void;
  showEditIngredientForm?: (ingredient: RecipeIngredientWithId) => void;
  showEditGroupForm?: (group: GroupWithId) => void;
}

export const DroppableGroup = ({
  group,
  handleDelete,
  isSortingContainer,
  deleteIngredient,
  showEditIngredientForm,
  showEditGroupForm,
  ...props
}: DroppableGroupProps) => {
  return (
    <DroppableContainer
      id={group.id}
      group={group}
      ingredientItems={group.ingredients}
      handleDelete={() => handleDelete(group)}
      showEditGroupForm={showEditGroupForm}
      {...props}
    >
      <SortableContext
        items={group.ingredients}
        strategy={verticalListSortingStrategy}
      >
        {group.ingredients.map(ingredient => (
          <SortableIngredientItem
            disabled={isSortingContainer}
            key={ingredient.id}
            ingredient={ingredient}
            deleteIngredient={deleteIngredient}
            showEditIngredientForm={showEditIngredientForm}
          />
        ))}
      </SortableContext>
    </DroppableContainer>
  );
};
