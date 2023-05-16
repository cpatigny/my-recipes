import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { GroupWithIngredients, RecipeIngredientWithId } from '../../../../types/recipe';
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
};

export const DefaultGroup = ({
  group, deleteIngredient, showEditIngredientForm,
}: DefaultGroupProps) => {
  const noIngredients = group.ingredients.length === 0;
  const ingredients = noIngredients ? [DEFAULT_INGREDIENT] : group.ingredients;
  return (
    <div className={`default-group ${noIngredients ? 'no-ingredients' : ''}`}>
      <SortableContext items={ingredients} strategy={verticalListSortingStrategy}>
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
