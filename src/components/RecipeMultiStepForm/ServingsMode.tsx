import { useState } from 'react';
import { FormElements } from './RecipeMultiStepForm';
import {
  GroupWithId,
  GroupWithIngredients,
  Groups,
  RecipeIngredientWithId,
  RecipeIngredients,
  RecipeFormData,
} from '../../types/recipe';
import removeGroupId from '../../utils/ingredients/removeGroupId';
import { Updater } from 'use-immer';

import IngredientAndGroupList from './IngredientAndGroupList';
import AddGroup from './AddGroup';
import NbOfServings from './NbOfServings';
import IngredientForm from './IngredientForm';
import Modal from '../Modal/Modal';
import GroupForm from './GroupForm';
import convertIngredientsArrayToObject from '../../utils/ingredients/convertIngredientsArrayToObject';

interface ServingsModeProps {
  nbServings?: string;
  servingsUnit?: string;
  groups?: Groups;
  ingredients: string | RecipeIngredients;
  recipeId: string;
  setFormData: Updater<RecipeFormData>;
  handleChange: (e: React.ChangeEvent<FormElements>) => void;
}

const ServingsMode = ({
  nbServings, servingsUnit, groups, ingredients, setFormData, recipeId, handleChange,
}: ServingsModeProps) => {
  const [ingredientToEdit, setIngredientToEdit] = useState<RecipeIngredientWithId | null>(null);
  const [groupToEdit, setGroupToEdit] = useState<GroupWithId | null>(null);
  const [showGroupForm, setShowGroupForm] = useState(false);

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
    setFormData(draft => {
      if (typeof draft.ingredients === 'object') {
        delete draft.ingredients[key];
      }
    });
  };

  const deleteGroup = (group: GroupWithIngredients) => {
    if (!window.confirm(`Supprimer le groupe "${group.name}" ?`)) return;

    const groupIngredientsObj = convertIngredientsArrayToObject(group.ingredients);
    const groupIngredientsWithoutGroupId = removeGroupId(groupIngredientsObj);

    // delete group and update ingredients groupId property
    setFormData(draft => {
      if (typeof draft.ingredients === 'object') {
        draft.ingredients = { ...draft.ingredients, ...groupIngredientsWithoutGroupId };
      }
      if (draft.groups) {
        delete draft.groups[group.id];
      }
    });
  };

  const title = groupToEdit ? 'Modifier un groupe' : 'Créer un groupe';

  return (
    <div className='servings-mode'>
      <NbOfServings
        nbServings={nbServings}
        servingsUnit={servingsUnit}
        handleChange={handleChange}
      />
      <IngredientForm
        ingredients={ingredients}
        recipeId={recipeId}
        setFormData={setFormData}
      />
      <AddGroup ingredients={ingredients} showGroupForm={() => setShowGroupForm(true)} />
      <IngredientAndGroupList
        groups={groups}
        ingredients={ingredients}
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
          ingredients={ingredients}
          recipeId={recipeId}
          setFormData={setFormData}
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
            recipeId={recipeId}
            setFormData={setFormData}
            closeModal={closeGroupForm}
          />
        )}
      </Modal>
    </div>
  );
};

export default ServingsMode;
