import { useState } from 'react';
import { GroupWithId, GroupWithIngredients, RecipeIngredientWithId, RecipeIngredients } from '../../../types/recipe';
import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';

import IngredientAndGroupList from './IngredientAndGroupList';
import AddGroup from './AddGroup';
import NbOfServings from './NbOfServings';
import IngredientForm from './IngredientForm';
import Modal from '../../Modal/Modal';
import GroupForm from './GroupForm';

const ServingsMode = () => {
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
      if (typeof draft.ingredients === 'object') {
        delete draft.ingredients[key];
      }
    });
  };

  const deleteGroup = (group: GroupWithIngredients) => {
    if (!window.confirm(`Supprimer le groupe "${group.name}" ?`)) return;

    const groupIngredientsIds = group.ingredients.map(ing => ing.id);

    // delete group and delete its ingredients
    setRecipeFormData(draft => {
      const allIngredients = draft.ingredients;
      if (typeof allIngredients === 'object') {
        // all ingredients but the ones from the group we're deleting
        const nonGroupIngredients: RecipeIngredients = {};

        Object
          .keys(allIngredients)
          .filter(key => !groupIngredientsIds.includes(key))
          .forEach(key => {
            const ingredient = allIngredients[key];
            if (!ingredient) return;
            nonGroupIngredients[key] = ingredient;
          });

        draft.ingredients = nonGroupIngredients;
      }
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
    <div className='servings-mode'>
      <NbOfServings handleStepSubmit={handleStepSubmit} />
      <IngredientForm />
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

export default ServingsMode;
