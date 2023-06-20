import { useState, useEffect, useRef } from 'react';
import { getNewItemPosition } from '../../../helpers/helpers';
import { generateIngredientKey } from '../../../helpers/ingredient.helpers';
import { useIngredientsDetails } from '../../../contexts/IngredientsDetailsContext';
import { useRecipeMultiStepForm, FormElements } from '../../../contexts/RecipeMultiStepFormContext';
import { useUnits } from '../../../contexts/UnitsContext';
import { RecipeIngredientWithId, RecipeIngredientFormData } from '../../../types/recipe';
import { FormErrors } from '../RecipeMultiStepForm';

import { Icon } from '../../Icon/Icon';
import { UnderlineInput } from '../../UnderlineInput/UnderlineInput';
import { IngredientDetailsCombobox } from './IngredientDetailsCombobox';
import { UnitCombobox } from './UnitCombobox';
import { CancelBtn } from '../../CancelBtn/CancelBtn';

interface IngredientFormProps {
  ingredient?: RecipeIngredientWithId;
  closeModal?: () => void;
}

export const IngredientForm = ({ ingredient, closeModal }: IngredientFormProps) => {
  const DEFAULT_INGREDIENT_DATA = {
    quantity: '',
    unitId: '',
    detailsId: '',
    preposition: '',
    additionalInfo: '',
  };

  const [
    ingredientData,
    setIngredientData,
  ] = useState<RecipeIngredientFormData>(DEFAULT_INGREDIENT_DATA);
  const [ingredientErrors, setIngredientErrors] = useState<FormErrors>({});

  const { ingredientsDetails } = useIngredientsDetails();
  const { units } = useUnits();
  const { setRecipeFormData, recipeId } = useRecipeMultiStepForm();
  const quantityInputRef = useRef<HTMLInputElement | null>(null);

  const hasErrors = Object.keys(ingredientErrors).length > 0;
  const editMode = typeof ingredient === 'object';

  useEffect(() => {
    if (!ingredient || !ingredientsDetails || !units) return;

    setIngredientData({
      quantity: ingredient.quantity ? ingredient.quantity.toString() : '',
      unitId: ingredient.unitId ? ingredient.unitId : '',
      detailsId: ingredient.detailsId,
      preposition: ingredient.preposition ? ingredient.preposition : '',
      additionalInfo: ingredient.additionalInfo ? ingredient.additionalInfo : '',
    });
  }, [ingredient, ingredientsDetails, units]);

  const handleIngredientChange = (e: React.ChangeEvent<FormElements>) => {
    const { name, value } = e.currentTarget;

    setIngredientData({
      ...ingredientData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setIngredientData(DEFAULT_INGREDIENT_DATA);
    setIngredientErrors({});
  };

  const resetFocus = () => {
    if (quantityInputRef.current) {
      quantityInputRef.current.focus();
    }
  };

  const validateIngredient = (ingredientToValidate: RecipeIngredientFormData) => {
    const errors: FormErrors = {};

    if (!ingredientToValidate.detailsId) {
      errors.name = `Veuillez sélectionner le nom de l'ingrédient`;
    }

    if (ingredientToValidate.unitId && !ingredientToValidate.quantity) {
      errors.quantity = `La quantité doit être indiquée si une unité est fournie`;
    }

    if (!ingredientToValidate.unitId && ingredientToValidate.preposition) {
      errors.unit = `Une unité est requise si une préposition est fournie`;
    }

    return errors;
  };

  const addIngredient = () => {
    const errors = validateIngredient(ingredientData);

    if (Object.keys(errors).length > 0) {
      setIngredientErrors(errors);
      return;
    }

    const newIngredientKey = generateIngredientKey(recipeId);

    setRecipeFormData(draft => {
      draft.ingredients[newIngredientKey] = {
        ...ingredientData,
        quantity: ingredientData.quantity ? Number(ingredientData.quantity) : false,
        position: getNewItemPosition(draft.ingredients),
        groupId: false,
        unitId: ingredientData.unitId ? ingredientData.unitId : false,
      };
    });

    resetForm();
    resetFocus();
  };

  const editIngredient = () => {
    // not edit mode
    if (!editMode) return;

    const errors = validateIngredient(ingredientData);

    if (Object.keys(errors).length > 0) {
      setIngredientErrors(errors);
      return;
    }

    setRecipeFormData(draft => {
      if (typeof draft.ingredients !== 'object') return;

      const ingredientToEdit = draft.ingredients[ingredient.id];
      if (!ingredientToEdit) return;

      draft.ingredients[ingredient.id] = {
        ...ingredientToEdit,
        ...ingredientData,
        unitId: ingredientData.unitId ? ingredientData.unitId : false,
        quantity: ingredientData.quantity ? Number(ingredientData.quantity) : false,
      };
    });

    if (!closeModal) {
      throw new Error('closeModal function must be passed when editing an ingredient');
    }

    resetForm();
    closeModal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editMode) {
      editIngredient();
      return;
    }

    addIngredient();
  };

  return (
    <div className={editMode ? 'edit-ingredient' : 'add-ingredient'}>
      {!editMode && (
        <p className='label'><b>Ajout d&apos;ingrédients :</b></p>
      )}
      <form id='ingredient-form' className='ingredient-form' onSubmit={handleSubmit}>
        <div className='ingredient-inputs'>
          <UnderlineInput
            ref={quantityInputRef}
            labelText='Quantité'
            name='quantity'
            type='number'
            min='0.1'
            step='0.1'
            value={ingredientData.quantity}
            onChange={handleIngredientChange}
            error={!!ingredientErrors.quantity}
          />

          <UnitCombobox
            ingredientData={ingredientData}
            setIngredientData={setIngredientData}
            units={units}
            error={!!ingredientErrors.unit}
          />

          <UnderlineInput
            labelText='Préposition'
            name='preposition'
            type='text'
            value={ingredientData.preposition}
            onChange={handleIngredientChange}
          />

          <IngredientDetailsCombobox
            ingredientData={ingredientData}
            setIngredientData={setIngredientData}
            ingredientsDetails={ingredientsDetails}
            error={!!ingredientErrors.name}
          />

          <UnderlineInput
            labelText='Information supplémentaire'
            name='additionalInfo'
            type='text'
            value={ingredientData.additionalInfo}
            onChange={handleIngredientChange}
          />
        </div>
        { hasErrors && (
          <ul className='form-errors'>
            { Object.keys(ingredientErrors).map(key => (
              <li key={key} className='form-error'>{ ingredientErrors[key] }</li>
            ))}
          </ul>
        )}
        {editMode ? (
          <div className='modal-actions'>
            <button className='btn-primary d-flex items-center justify-center'>
              <Icon name={ editMode ? 'edit' : 'add' } />
              Modifier
            </button>
            {closeModal && <CancelBtn onClick={closeModal} text='Annuler' icon={true} />}
          </div>
        ) : (
          <button className='btn-primary d-flex items-center justify-center'>
            <Icon name={ editMode ? 'edit' : 'add' } />
            Ajouter ingrédient
          </button>
        )}
      </form>
    </div>
  );
};
