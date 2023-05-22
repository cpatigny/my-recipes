import { useState, useEffect, useRef } from 'react';
import { getNewItemPosition } from '../../../helpers/helpers';
import { generateIngredientKey } from '../../../helpers/ingredient.helpers';
import { getMatchingIngredientsDetails } from '../../../helpers/ingredientDetails.helpers';
import { getMatchingUnits } from '../../../helpers/units.helpers';
import { useIngredientsDetails } from '../../../contexts/IngredientsDetailsContext';
import { useRecipeMultiStepForm, FormElements } from '../../../contexts/RecipeMultiStepFormContext';
import { useUnits } from '../../../contexts/UnitsContext';
import { IngredientDetailsWithId } from '../../../types/ingredientDetails';
import { RecipeIngredientWithId, RecipeIngredientFormData } from '../../../types/recipe';
import { UnitWithId } from '../../../types/unit';
import { FormErrors } from '../RecipeMultiStepForm';

import { AutocompleteInput } from '../../AutocompleteInput/AutocompleteInput';
import { Icon } from '../../Icon/Icon';
import { UnderlineInput } from '../../UnderlineInput/UnderlineInput';

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
  const [ingredientName, setIngredientName] = useState('');
  const [
    matchingIngredientsDetails, setMatchingIngredientsDetails,
  ] = useState<IngredientDetailsWithId[] | null>(null);
  const [unitName, setUnitName] = useState('');
  const [matchingUnits, setMatchingUnits] = useState<UnitWithId[] | null>(null);

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

    const ingredientDetails = ingredientsDetails[ingredient.detailsId];
    if (ingredientDetails) {
      setIngredientName(ingredientDetails.singular);
    }

    const unitId = ingredient.unitId;
    const unit = unitId && units[unitId];
    if (unit) {
      setUnitName(unit.symbol ? unit.symbol : unit.singular);
    }
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
    setIngredientName('');
    setUnitName('');
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

  const handleIngredientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    setIngredientName(name);
    const matchingIng = getMatchingIngredientsDetails(name, ingredientsDetails);
    setMatchingIngredientsDetails(matchingIng);
    setIngredientData({ ...ingredientData, detailsId: '' });
  };

  const selectIngredient = (ingredientDetails: IngredientDetailsWithId) => {
    setIngredientData({ ...ingredientData, detailsId: ingredientDetails.id });
    setIngredientName(ingredientDetails.singular);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;
    setUnitName(name);
    const matching = getMatchingUnits(name, units);
    setMatchingUnits(matching);

    // to remove selected unit if there is one when user edit unit name
    setIngredientData({ ...ingredientData, unitId: '' });
  };

  const selectUnit = (unitToSelect: UnitWithId) => {
    setIngredientData({ ...ingredientData, unitId: unitToSelect.id });
    setUnitName(unitToSelect.symbol ? unitToSelect.symbol : unitToSelect.singular);
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

          <AutocompleteInput<UnitWithId>
            matchingObjects={matchingUnits}
            propertyToShow='singular'
            secondaryPropertyToShow='symbol'
            selectItem={selectUnit}
            setMatchingObjects={setMatchingUnits}
            labelText='Unité'
            name='unit'
            value={unitName}
            onChange={handleUnitChange}
            error={!!ingredientErrors.unit}
            noMatchingMsg='Aucune unité trouvée'
          />

          <UnderlineInput
            labelText='Préposition'
            name='preposition'
            type='text'
            value={ingredientData.preposition}
            onChange={handleIngredientChange}
          />

          <AutocompleteInput<IngredientDetailsWithId>
            matchingObjects={matchingIngredientsDetails}
            propertyToShow='singular'
            selectItem={selectIngredient}
            setMatchingObjects={setMatchingIngredientsDetails}
            labelText='Ingrédient'
            name='name'
            value={ingredientName}
            error={!!ingredientErrors.name}
            onChange={handleIngredientNameChange}
            noMatchingMsg='Aucun ingrédient trouvé'
            required
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
        <button className='btn-primary d-flex items-center justify-center'>
          <Icon name={ editMode ? 'edit' : 'add' } />
          { editMode ? 'Modifier ' : 'Ajouter ingrédient' }
        </button>
      </form>
    </div>
  );
};
