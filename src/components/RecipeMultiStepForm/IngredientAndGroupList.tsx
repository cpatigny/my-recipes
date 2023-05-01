import { useRecipeMultiStepForm } from '../../providers/RecipeMultiStepFormContext';
import { GroupWithId, GroupWithIngredients, RecipeIngredientWithId } from '../../types/recipe';
import getGroupsWithTheirIngredients from '../../utils/groups/getGroupsWithTheirIngredients';
import getIngredientsWithoutGroup from '../../utils/ingredients/getIngredientsWithoutGroup';

import GroupListItem from './GroupListItem';
import IngredientListItem from './IngredientListItem';

interface IngredientAndGroupListProps {
  deleteIngredient: (key: string) => void;
  showEditIngredientForm: (ingredient: RecipeIngredientWithId) => void;
  showEditGroupForm: (group: GroupWithId) => void;
  deleteGroup: (group: GroupWithIngredients) => void;
}

const IngredientAndGroupList = ({
  deleteIngredient, showEditIngredientForm, showEditGroupForm, deleteGroup,
}: IngredientAndGroupListProps) => {
  const { recipeFormData } = useRecipeMultiStepForm();
  const { groups, ingredients } = recipeFormData;

  const noIngredients = typeof ingredients === 'string' || Object.keys(ingredients).length === 0;

  let ingredientsWithoutGroup: RecipeIngredientWithId[] | null = null;
  let groupsWithIngredients: GroupWithIngredients[] | null = null;

  if (typeof ingredients === 'object') {
    ingredientsWithoutGroup = getIngredientsWithoutGroup(ingredients);
  }

  if (typeof ingredients === 'object' && typeof groups === 'object') {
    groupsWithIngredients = getGroupsWithTheirIngredients(groups, ingredients);
  }

  return (
    <div className='all-groups-and-ingredients'>
      <p className='label'><b>Liste des groupes & ingrédients :</b></p>
      { noIngredients && (
        <p className='secondary'>Vous n&apos;avez ajouté aucun ingrédient</p>
      )}
      <ul>
        {ingredientsWithoutGroup && ingredientsWithoutGroup.map(ingredient => (
          <IngredientListItem
            key={ingredient.id}
            id={ingredient.id}
            ingredient={ingredient}
            deleteIngredient={deleteIngredient}
            showEditIngredientForm={showEditIngredientForm}
          />
        ))}
      </ul>
      {groupsWithIngredients && groupsWithIngredients.map(group => (
        <GroupListItem
          key={group.id}
          group={group}
          deleteIngredient={deleteIngredient}
          showEditIngredientForm={showEditIngredientForm}
          showEditGroupForm={showEditGroupForm}
          deleteGroup={deleteGroup}
        />
      ))}
    </div>
  );
};

export default IngredientAndGroupList;
