import { useEffect, useState } from 'react';
import {
  RecipeIngredientFormData,
  RecipeIngredientWithId,
  RecipeIngredients,
  RecipeFormData,
} from '../../types/recipe';
import { FormElements, FormErrors } from './RecipeMultiStepForm';
import generateIngredientKey from '../../utils/firebase/generateIngredientKey';
import getNewItemPosition from '../../utils/getNewItemPosition';

import UnderlineInput from '../UnderlineInput/UnderlineInput';

interface IngredientFormProps {
  ingredients: string | RecipeIngredients;
  recipeId: string;
  setFormData: React.Dispatch<React.SetStateAction<RecipeFormData>>
  ingredient?: RecipeIngredientWithId;
  closeModal?: () => void;
}

const IngredientForm = ({
  ingredients, recipeId, setFormData, ingredient, closeModal,
}: IngredientFormProps) => {
  const DEFAULT_INGREDIENT_DATA = {
    quantity: '',
    unit: '',
    name: '',
  };

  const [
    ingredientData,
    setIngredientData,
  ] = useState<RecipeIngredientFormData>(DEFAULT_INGREDIENT_DATA);
  const [ingredientErrors, setIngredientErrors] = useState<FormErrors>({});

  const hasErrors = Object.keys(ingredientErrors).length > 0;
  const editMode = typeof ingredient === 'object';

  useEffect(() => {
    if (!ingredient) return;

    setIngredientData({
      quantity: ingredient.quantity ? ingredient.quantity.toString() : '',
      unit: ingredient.unit ?? '',
      name: ingredient.name,
    });
  }, [ingredient]);

  const handleIngredientChange = (e: React.ChangeEvent<FormElements>) => {
    const { name, value } = e.currentTarget;

    setIngredientData({
      ...ingredientData,
      [name]: value,
    });
  };

  const validateIngredient = (ingredientToValidate: RecipeIngredientFormData) => {
    const errors: FormErrors = {};

    if (!ingredientToValidate.name) {
      errors.name = `Veuillez entrer le nom de l'ingrédient`;
    }

    if (ingredientToValidate.unit && !ingredientToValidate.quantity) {
      errors.quantity = `La quantité doit être indiquée si une unité est fournie`;
    }

    return errors;
  };

  const addIngredient = () => {
    const errors = validateIngredient(ingredientData);

    if (Object.keys(errors).length > 0) {
      setIngredientErrors(errors);
      return;
    }

    // If the ingredients was markdown (a string) we make it an empty array by default
    const prevIngredients = typeof ingredients === 'object' ? { ...ingredients } : {};
    const newIngredientKey = generateIngredientKey(recipeId);

    setFormData(prevFormData => {
      const newFormData = { ...prevFormData };
      newFormData.ingredients = prevIngredients;
      newFormData.ingredients[newIngredientKey] = {
        ...ingredientData,
        quantity: ingredientData.quantity ? Number(ingredientData.quantity) : '',
        position: getNewItemPosition(prevIngredients),
        groupId: false,
      };
      return newFormData;
    });

    setIngredientData(DEFAULT_INGREDIENT_DATA);
    setIngredientErrors({});
  };

  const editIngredient = () => {
    // not edit mode
    if (!editMode) return;

    const errors = validateIngredient(ingredientData);

    if (Object.keys(errors).length > 0) {
      setIngredientErrors(errors);
      return;
    }

    setFormData(prevFormData => {
      const newFormData = { ...prevFormData };
      if (typeof newFormData.ingredients !== 'object') {
        return prevFormData;
      }

      const ingredientToEdit = newFormData.ingredients[ingredient.id];
      if (!ingredientToEdit) {
        return prevFormData;
      }

      newFormData.ingredients[ingredient.id] = {
        ...ingredientData,
        position: ingredientToEdit.position,
        quantity: ingredientData.quantity ? Number(ingredientData.quantity) : '',
        groupId: ingredientToEdit.groupId,
      };
      return newFormData;
    });

    if (!closeModal) {
      throw new Error('closeModal function must be passed when editing an ingredient');
    }

    closeModal();
  };

  const submitIngredient = () => {
    if (editMode) {
      editIngredient();
      return;
    }

    addIngredient();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitIngredient();
    }
  };

  return (
    <div className={editMode ? 'edit-ingredient' : 'add-ingredient'}>
      { !editMode && (
        <p className='label'><b>Ajout d&apos;ingrédients :</b></p>
      )}
      <div className='ingredient-form'>
        <UnderlineInput
          labelText='Quantité'
          name='quantity'
          type='number'
          min='1'
          step='1'
          value={ingredientData.quantity}
          onChange={handleIngredientChange}
          error={!!ingredientErrors.quantity}
          onKeyDown={handleKeyDown}
        />
        <UnderlineInput
          labelText='Unité'
          name='unit'
          type='text'
          value={ingredientData.unit}
          onChange={handleIngredientChange}
          onKeyDown={handleKeyDown}
        />
        <UnderlineInput
          labelText='Ingrédient'
          name='name'
          type='text'
          value={ingredientData.name}
          onChange={handleIngredientChange}
          error={!!ingredientErrors.name}
          onKeyDown={handleKeyDown}
        />
      </div>
      { hasErrors && (
        <ul className='form-errors'>
          { Object.keys(ingredientErrors).map(key => (
            <li key={key} className='form-error'>{ ingredientErrors[key] }</li>
          ))}
        </ul>
      )}
      <button className='btn-primary d-flex items-center justify-center' type='button' onClick={submitIngredient}>
        <span className='material-icons-round'>{ editMode ? 'edit' : 'add' }</span>
        { editMode ? 'Modifier ' : 'Ajouter ingrédient' }
      </button>
    </div>
  );
};

export default IngredientForm;
