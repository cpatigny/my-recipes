import { useState } from 'react';
import { getIngredientDetailsName, getMatchingIngredientsDetails } from '../../../helpers/ingredientDetails.helpers';
import { RecipeIngredientFormData } from '../../../types/recipe';
import { IngredientsDetails } from '../../../types/ingredientDetails';
import { cx } from '../../../../styled-system/css';
import { combobox } from '../../../recipes/combobox';

import { Combobox } from '@headlessui/react';
import { Icon } from '../../Icon';

interface IngredientDetailsComboboxProps {
  ingredientData: RecipeIngredientFormData;
  setIngredientData: React.Dispatch<React.SetStateAction<RecipeIngredientFormData>>;
  ingredientsDetails: IngredientsDetails | null;
  error: boolean;
  className?: string;
}

export const IngredientDetailsCombobox = ({
  ingredientData, setIngredientData, ingredientsDetails, error, className,
}: IngredientDetailsComboboxProps) => {
  const [ingredientSearch, setIngredientSearch] = useState('');

  const matchingIngredients = getMatchingIngredientsDetails(ingredientSearch, ingredientsDetails);

  return (
    <Combobox
      as='div'
      value={ingredientData.detailsId}
      onChange={value => setIngredientData({ ...ingredientData, detailsId: value })}
      className={cx(
        className || '',
        combobox(),
      )}
    >
      <Combobox.Input
        placeholder='Ingrédient'
        data-error={error}
        onChange={e => setIngredientSearch(e.currentTarget.value)}
        displayValue={(id: string) => getIngredientDetailsName(ingredientsDetails, id)}
      />
      <Combobox.Options>
        {matchingIngredients.length === 0 && ingredientSearch !== '' ? (
          <div>Aucun ingrédient trouvé</div>
        ) : (
          matchingIngredients.map(ing => (
            <Combobox.Option
              key={ing.id}
              value={ing.id}
              data-an-option-is-selected={!!ingredientData.detailsId}
            >
              {({ selected }) => (
                <>
                  {selected && (
                    <Icon name='check' aria-hidden='true' />
                  )}
                  <span>{ ing.name }</span>
                </>
              )}
            </Combobox.Option>
          ))
        )}
      </Combobox.Options>
    </Combobox>
  );
};
