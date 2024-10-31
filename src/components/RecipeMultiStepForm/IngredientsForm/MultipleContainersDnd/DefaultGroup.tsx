import { css } from '../../../../../styled-system/css';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  GroupWithIngredients,
  RecipeIngredientWithId,
} from '../../../../types/recipe';
import { SortableIngredientItem } from './SortableIngredientItem';

interface DefaultGroupProps {
  group: GroupWithIngredients;
  deleteIngredient?: (key: string) => void;
  showEditIngredientForm?: (ingredient: RecipeIngredientWithId) => void;
}

// this default ingredient will allow to drop items in the default group
// when there is no ingredients in it
export const DEFAULT_INGREDIENT: RecipeIngredientWithId = {
  id: '0',
  position: -1,
  quantity: false,
  unitId: false,
  detailsId: '',
  groupId: false,
  preposition: false,
  additionalInfo: false,
};

export const DefaultGroup = ({
  group,
  deleteIngredient,
  showEditIngredientForm,
}: DefaultGroupProps) => {
  const noIngredients = group.ingredients.length === 0;
  const ingredients = noIngredients ? [DEFAULT_INGREDIENT] : group.ingredients;
  return (
    <div
      data-no-ingredients={!!noIngredients}
      className={css({
        m: '1.2rem 0 1.5rem',

        '&[data-no-ingredients=true]': {
          mt: '0',
        },
      })}
    >
      <SortableContext
        items={ingredients}
        strategy={verticalListSortingStrategy}
      >
        {ingredients.map(ingredient => (
          <SortableIngredientItem
            key={ingredient.id}
            ingredient={ingredient}
            deleteIngredient={deleteIngredient}
            showEditIngredientForm={showEditIngredientForm}
          />
        ))}
      </SortableContext>
    </div>
  );
};
