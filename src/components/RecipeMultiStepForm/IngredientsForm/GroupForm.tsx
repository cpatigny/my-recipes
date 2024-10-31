import { useEffect, useState } from 'react';
import { generateGroupKey } from '../../../helpers/group.helpers';
import { getNewItemPosition } from '../../../helpers/helpers';
import {
  getIngredientsByGroup,
  addGroupIdToIngredients,
  getExcludedIngredients,
  removeGroupId,
  getIngredientsWithoutGroup,
} from '../../../helpers/ingredient.helpers';
import { useIngredientsDetails } from '../../../contexts/IngredientsDetailsContext';
import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';
import { useUnits } from '../../../contexts/UnitsContext';
import { GroupWithId, RecipeIngredients } from '../../../types/recipe';
import { FormErrors } from '../RecipeMultiStepForm';
import { css } from '../../../../styled-system/css';

import { IngredientCheckbox } from './IngredientCheckbox';
import { UnderlineInput } from '../../UnderlineInput';
import { CancelBtn } from '../../CancelBtn';
import { InfoText } from '../../InfoText';
import { ModalActions } from '../../Modal/ModalActions';
import { Button } from '../../Button';

interface GroupFormProps {
  group?: GroupWithId;
  ingredients: RecipeIngredients;
  closeModal: () => void;
}

export interface GroupFormData {
  name: string;
  ingredients: string[];
}

export const GroupForm = ({
  group,
  ingredients,
  closeModal,
}: GroupFormProps) => {
  const [groupData, setGroupData] = useState<GroupFormData>({
    name: '',
    ingredients: [],
  });
  const [groupErrors, setGroupErrors] = useState<FormErrors>({});

  const { ingredientsDetails } = useIngredientsDetails();
  const { units } = useUnits();
  const { recipeId, setRecipeFormData } = useRecipeMultiStepForm();

  useEffect(() => {
    if (!group) return;

    const groupIngredients = getIngredientsByGroup(group.id, ingredients);
    const groupIngredientsId = groupIngredients.map(
      ingredient => ingredient.id,
    );

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

    return errors;
  };

  const updateIngredientsFormData = (updatedIngredients: RecipeIngredients) => {
    setRecipeFormData(draft => {
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
      newGroupId,
      groupData.ingredients,
      ingredients,
    );

    // update recipeFormData with edited ingredients (with goupId)
    updateIngredientsFormData(groupedIngredients);
  };

  const editGroup = () => {
    if (!group) {
      throw new Error('Calling editGroup function when not in edit mode');
    }

    setRecipeFormData(draft => {
      if (!draft.groups) return;
      const groupToUpdate = draft.groups[group.id];
      if (!groupToUpdate) return;
      groupToUpdate.name = groupData.name;
    });

    const groupedIngredients = addGroupIdToIngredients(
      group.id,
      groupData.ingredients,
      ingredients,
    );

    let excludedIngredients = getExcludedIngredients(
      group,
      groupData.ingredients,
      ingredients,
    );
    excludedIngredients = removeGroupId(excludedIngredients);

    const updatedIngredients = {
      ...groupedIngredients,
      ...excludedIngredients,
    };

    updateIngredientsFormData(updatedIngredients);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
    <form onSubmit={handleSubmit}>
      <UnderlineInput
        labelText='Nom du groupe'
        name='name'
        type='text'
        value={groupData.name}
        onChange={handleChange}
        required
        className={css({ w: '100%' })}
      />
      <InfoText>Exemple : Pour la sauce, Pour la marinade...</InfoText>

      <p className={css({ m: '0.7rem 0 .5rem' })}>
        <b>Ingrédients dans le groupe :</b>
      </p>
      {groupErrors.ingredients && (
        <p className={css({ color: 'danger', fontSize: '1rem' })}>
          {groupErrors.ingredients}
        </p>
      )}
      <div>
        {ingredientsToShow.map(ingredient => (
          <IngredientCheckbox
            key={ingredient.id}
            ingredient={ingredient}
            checked={groupData.ingredients.includes(ingredient.id)}
            ingredientsDetails={ingredientsDetails}
            units={units}
            handleCheck={handleCheck}
          />
        ))}
      </div>

      <ModalActions>
        <Button size='smd'>{group ? 'Modifier' : 'Créer'}</Button>
        <CancelBtn onClick={closeModal} text='Annuler' />
      </ModalActions>
    </form>
  );
};
