import { useState } from 'react';
import { getIngredientDetailsName, getMatchingIngredientsDetails } from '../../../helpers/ingredientDetails.helpers';
import { RecipeIngredientFormData } from '../../../types/recipe';
import { IngredientsDetails } from '../../../types/ingredientDetails';

import { Combobox } from '@headlessui/react';
import { Icon } from '../../Icon/Icon';

interface IngredientDetailsComboboxProps {
  ingredientData: RecipeIngredientFormData;
  setIngredientData: React.Dispatch<React.SetStateAction<RecipeIngredientFormData>>;
  ingredientsDetails: IngredientsDetails | null;
  error: boolean;
}

export const IngredientDetailsCombobox = ({
  ingredientData, setIngredientData, ingredientsDetails, error,
}: IngredientDetailsComboboxProps) => {
  const [ingredientSearch, setIngredientSearch] = useState('');

  const matchingIngredients = getMatchingIngredientsDetails(ingredientSearch, ingredientsDetails);

  return (
    <Combobox
      as='div'
      className='combobox ingredient-details-combobox'
      value={ingredientData.detailsId}
      onChange={value => setIngredientData({ ...ingredientData, detailsId: value })}
    >
      <Combobox.Input
        placeholder='Ingrédient'
        className={`combobox-input ${error ? 'error' : ''}`}
        onChange={e => setIngredientSearch(e.currentTarget.value)}
        displayValue={(id: string) => getIngredientDetailsName(ingredientsDetails, id)}
      />
      <Combobox.Options className='combobox-options'>
        {matchingIngredients.length === 0 && ingredientSearch !== '' ? (
          <div className='no-match'>Aucun ingrédient trouvé</div>
        ) : (
          matchingIngredients.map(ing => (
            <Combobox.Option
              key={ing.id}
              value={ing.id}
              className={`combobox-option ${ingredientData.detailsId ? 'has-option-selected' : ''}`}
            >
              {({ selected }) => (
                <>
                  {selected && (
                    <Icon name='check' className='check-icon' aria-hidden='true' />
                  )}
                  <span className='combobox-option-text'>{ ing.name }</span>
                </>
              )}
            </Combobox.Option>
          ))
        )}
      </Combobox.Options>
    </Combobox>
  );
};
