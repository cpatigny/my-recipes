import { useEffect, useState } from 'react';
import { GroupWithId, RecipeIngredients, RecipeFormData } from '../../types/recipe';
import { FormErrors } from './RecipeMultiStepForm';
import getIngredientsWithoutGroup from '../../utils/ingredients/getIngredientsWithoutGroup';
import generateGroupKey from '../../utils/firebase/generateGroupKey';
import getNewItemPosition from '../../utils/getNewItemPosition';
import getIngredientsByGroup from '../../utils/ingredients/getIngredientsByGroup';
import addGroupIdToIngredients from '../../utils/ingredients/addGroupIdToIngredients';
import getExcludedIngredients from '../../utils/ingredients/getExcludedIngredients';
import removeGroupId from '../../utils/ingredients/removeGroupId';
import { Updater } from 'use-immer';
import { useIngredientsDetails } from '../../providers/IngredientsDetailsProvider';
import { useUnits } from '../../providers/UnitsProvider';

import UnderlineInput from '../UnderlineInput/UnderlineInput';
import IngredientCheckbox from './IngredientCheckbox';

interface GroupFormProps {
  group?: GroupWithId;
  ingredients: RecipeIngredients;
  recipeId: string;
  setRecipeFormData: Updater<RecipeFormData>;
  closeModal: () => void;
}

export interface GroupFormData {
  name: string;
  ingredients: string[];
}

const GroupForm = ({
  group, ingredients, recipeId, setRecipeFormData, closeModal,
}: GroupFormProps) => {
  const [groupData, setGroupData] = useState<GroupFormData>({
    name: '',
    ingredients: [],
  });
  const [groupErrors, setGroupErrors] = useState<FormErrors>({});

  const { ingredientsDetails } = useIngredientsDetails();
  const { units } = useUnits();

  useEffect(() => {
    if (!group) return;

    const groupIngredients = getIngredientsByGroup(group.id, ingredients);
    const groupIngredientsId = groupIngredients.map(ingredient => ingredient.id);

    setGroupData({
      name: group.name,
      ingredients: groupIngredientsId,
    });
  }, [group, ingredients]);

  const validateGroup = (groupToValidate: GroupFormData) => {
    const errors: FormErrors = {};

    if (groupToValidate.ingredients.length === 0) {
      errors.ingredients = 'Choisissez au moins 1 ingrédient';
    }

    if (groupToValidate.name.length === 0) {
      errors.name = 'Veuillez entrer un nom de groupe';
    }

    return errors;
  };

  const updateIngredientsFormData = (updatedIngredients: RecipeIngredients) => {
    setRecipeFormData(draft => {
      if (typeof draft.ingredients === 'string') return;
      draft.ingredients = { ...draft.ingredients, ...updatedIngredients };
    });
  };

  const addGroup = () => {
    const newGroupId = generateGroupKey(recipeId);

    // add new group to recipeFormData
    setRecipeFormData(draft => {
      const groups = draft.groups ? { ...draft.groups } : {};
      groups[newGroupId] = {
        name: groupData.name,
        position: getNewItemPosition(groups),
      };
      return { ...draft, groups };
    });

    const groupedIngredients = addGroupIdToIngredients(
      newGroupId, groupData.ingredients, ingredients,
    );

    // update recipeFormData with edited ingredients (with goupId)
    updateIngredientsFormData(groupedIngredients);
  };

  const editGroup = () => {
    if (!group) {
      throw new Error('Calling editGroup function when not in edit mode');
    }

    const groupedIngredients = addGroupIdToIngredients(
      group.id, groupData.ingredients, ingredients,
    );

    let excludedIngredients = getExcludedIngredients(group, groupData.ingredients, ingredients);
    excludedIngredients = removeGroupId(excludedIngredients);

    const updatedIngredients = { ...groupedIngredients, ...excludedIngredients };

    updateIngredientsFormData(updatedIngredients);
  };

  const handleSubmit = () => {
    const errors = validateGroup(groupData);

    if (Object.keys(errors).length > 0) {
      setGroupErrors(errors);
      return;
    }

    if (group) {
      editGroup();
    } else {
      addGroup();
    }

    closeModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setGroupData({ ...groupData, [name]: value });
  };

  const handleCheck = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;
    const updateIngredients = [...groupData.ingredients];

    if (checked) {
      updateIngredients.push(value);
    } else {
      // remove unchecked ingredient
      updateIngredients.splice(groupData.ingredients.indexOf(value), 1);
    }

    setGroupData({ ...groupData, ingredients: updateIngredients });
  };

  const ingredientsWithoutGroup = getIngredientsWithoutGroup(ingredients);
  let ingredientsToShow = [...ingredientsWithoutGroup];

  // edit mode
  if (group) {
    const groupToEditIngredients = getIngredientsByGroup(group.id, ingredients);
    ingredientsToShow = [...ingredientsWithoutGroup, ...groupToEditIngredients];
  }

  return (
    <div className='group-form'>
      <UnderlineInput
        labelText='Nom du groupe'
        name='name'
        type='text'
        value={groupData.name}
        error={!!groupErrors.name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <i className='example'>Exemple : Pour la sauce, Pour la marinade...</i>

      <p><b>Ingrédients dans le groupe :</b></p>
      { groupErrors.ingredients && (
        <p className='form-error'>{ groupErrors.ingredients }</p>
      )}
      <div className='ingredients'>
        {ingredientsToShow.map(ingredient => (
          <IngredientCheckbox
            key={ingredient.id}
            ingredient={ingredient}
            checked={groupData.ingredients.includes(ingredient.id)}
            ingredientsDetails={ingredientsDetails}
            units={units}
            handleCheck={handleCheck}
            handleKeyDown={handleKeyDown}
          />
        ))}
      </div>

      <button className='btn-primary'type='button' onClick={handleSubmit}>
        { group ? 'Modifier' : 'Créer' }
      </button>
    </div>
  );
};

export default GroupForm;
