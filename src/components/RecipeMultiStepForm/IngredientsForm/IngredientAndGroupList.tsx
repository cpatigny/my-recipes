import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';
import { GroupWithId, GroupWithIngredients, RecipeIngredientWithId } from '../../../types/recipe';

import { GroupsContainers } from './MultipleContainersDnd/GroupsContainers';

export interface IngredientAndGroupListProps {
  deleteIngredient: (key: string) => void;
  showEditIngredientForm: (ingredient: RecipeIngredientWithId) => void;
  showEditGroupForm: (group: GroupWithId) => void;
  deleteGroup: (group: GroupWithIngredients) => void;
}

const IngredientAndGroupList = ({
  deleteIngredient, showEditIngredientForm, showEditGroupForm, deleteGroup,
}: IngredientAndGroupListProps) => {
  const { recipeFormData } = useRecipeMultiStepForm();
  const { ingredients } = recipeFormData;

  const noIngredients = Object.keys(ingredients).length === 0;

  return (
    <div className='all-groups-and-ingredients'>
      <p className='label'><b>Liste des groupes & ingrédients :</b></p>
      { noIngredients && (
        <p className='secondary'>Vous n&apos;avez ajouté aucun ingrédient</p>
      )}
      <GroupsContainers
        deleteIngredient={deleteIngredient}
        deleteGroup={deleteGroup}
        showEditIngredientForm={showEditIngredientForm}
        showEditGroupForm={showEditGroupForm}
      />
    </div>
  );
};

export default IngredientAndGroupList;
