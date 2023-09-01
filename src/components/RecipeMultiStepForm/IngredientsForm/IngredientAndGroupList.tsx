import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';
import { GroupWithId, GroupWithIngredients, RecipeIngredientWithId } from '../../../types/recipe';

import { GroupsContainers } from './MultipleContainersDnd/GroupsContainers';
import { Block } from '../../Block';
import { SecondaryText } from '../../SecondaryText';

export interface IngredientAndGroupListProps {
  deleteIngredient: (key: string) => void;
  showEditIngredientForm: (ingredient: RecipeIngredientWithId) => void;
  showEditGroupForm: (group: GroupWithId) => void;
  deleteGroup: (group: GroupWithIngredients) => void;
}

export const IngredientAndGroupList = ({
  deleteIngredient, showEditIngredientForm, showEditGroupForm, deleteGroup,
}: IngredientAndGroupListProps) => {
  const { recipeFormData } = useRecipeMultiStepForm();
  const { ingredients } = recipeFormData;

  const noIngredients = Object.keys(ingredients).length === 0;

  return (
    <Block>
      <p><b>Liste des groupes & ingrédients :</b></p>
      { noIngredients ? (
        <SecondaryText>Vous n&apos;avez ajouté aucun ingrédient</SecondaryText>
      ) : (
        <GroupsContainers
          deleteIngredient={deleteIngredient}
          deleteGroup={deleteGroup}
          showEditIngredientForm={showEditIngredientForm}
          showEditGroupForm={showEditGroupForm}
        />
      )}
    </Block>
  );
};
