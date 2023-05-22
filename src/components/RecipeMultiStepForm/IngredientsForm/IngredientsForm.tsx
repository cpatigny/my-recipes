import { useState } from 'react';
import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';
import { RecipeIngredientWithId, GroupWithId, GroupWithIngredients, RecipeIngredients } from '../../../types/recipe';

import { Modal } from '../../Modal/Modal';
import { AddGroup } from './AddGroup';
import { GroupForm } from './GroupForm';
import { IngredientAndGroupList } from './IngredientAndGroupList';
import { IngredientForm } from './IngredientForm';
import { NbOfServings } from './NbOfServings';
import { Block } from '../../Block/Block';

export const IngredientsForm = () => {
  const [ingredientToEdit, setIngredientToEdit] = useState<RecipeIngredientWithId | null>(null);
  const [groupToEdit, setGroupToEdit] = useState<GroupWithId | null>(null);
  const [showGroupForm, setShowGroupForm] = useState(false);

  const { recipeFormData, setRecipeFormData, next } = useRecipeMultiStepForm();
  const { ingredients } = recipeFormData;

  const showEditIngredientForm = (ingredient: RecipeIngredientWithId) => {
    setIngredientToEdit(ingredient);
  };

  const showEditGroupForm = (group: GroupWithId) => {
    setGroupToEdit(group);
    setShowGroupForm(true);
  };

  const closeGroupForm = () => {
    setShowGroupForm(false);
  };

  const deleteIngredient = (key: string) => {
    setRecipeFormData(draft => {
      delete draft.ingredients[key];
    });
  };

  const deleteGroup = (group: GroupWithIngredients) => {
    if (!window.confirm(`Supprimer le groupe "${group.name}" ?`)) return;

    const groupIngredientsIds = group.ingredients.map(ing => ing.id);

    // delete group and delete its ingredients
    setRecipeFormData(draft => {
      // all ingredients but the ones from the group we're deleting
      const nonGroupIngredients: RecipeIngredients = {};

      Object
        .keys(draft.ingredients)
        .filter(key => !groupIngredientsIds.includes(key))
        .forEach(key => {
          const ingredient = draft.ingredients[key];
          if (!ingredient) return;
          nonGroupIngredients[key] = ingredient;
        });

      draft.ingredients = nonGroupIngredients;

      if (draft.groups) {
        delete draft.groups[group.id];
      }
    });
  };

  const handleStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(ingredients).length === 0) {
      alert('Veuillez ajouter au moins 1 ingrédient');
      return;
    }

    next();
  };

  const title = groupToEdit ? 'Modifier un groupe' : 'Créer un groupe';

  return (
    <div className='form-container ingredients-form'>
      <NbOfServings handleStepSubmit={handleStepSubmit} />
      <Block>
        <IngredientForm />
      </Block>
      <AddGroup ingredients={ingredients} showGroupForm={() => setShowGroupForm(true)} />
      <IngredientAndGroupList
        deleteIngredient={deleteIngredient}
        showEditIngredientForm={showEditIngredientForm}
        showEditGroupForm={showEditGroupForm}
        deleteGroup={deleteGroup}
      />
      <Modal
        isShow={!!ingredientToEdit}
        close={() => setIngredientToEdit(null)}
        title='Modifier ingrédient'
        className='modal-edit-ingredient'
      >
        <IngredientForm
          ingredient={ingredientToEdit ?? undefined}
          closeModal={() => setIngredientToEdit(null)}
        />
      </Modal>
      <Modal
        isShow={showGroupForm}
        close={closeGroupForm}
        title={title}
        className='modal-group-form'
        onCloseAnimationEnd={() => setGroupToEdit(null)}
      >
        {typeof ingredients !== 'string' && (
          <GroupForm
            group={groupToEdit ?? undefined}
            ingredients={ingredients}
            closeModal={closeGroupForm}
          />
        )}
      </Modal>
    </div>
  );
};
