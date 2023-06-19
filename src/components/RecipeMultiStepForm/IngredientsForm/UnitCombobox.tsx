import { RecipeIngredientFormData } from '../../../types/recipe';
import { useState } from 'react';
import { getMatchingUnits, getUnitName, getUnitNameById } from '../../../helpers/units.helpers';
import { Units } from '../../../types/unit';

import { Icon } from '../../Icon/Icon';
import { Combobox } from '@headlessui/react';

interface UnitComboboxProps {
  ingredientData: RecipeIngredientFormData;
  setIngredientData: React.Dispatch<React.SetStateAction<RecipeIngredientFormData>>;
  units: Units | null;
  error: boolean;
}

export const UnitCombobox = ({
  ingredientData, setIngredientData, units, error,
}: UnitComboboxProps) => {
  const [unitSearch, setUnitSearch] = useState('');

  const matchingUnits = getMatchingUnits(unitSearch, units);

  return (
    <Combobox
      as='div'
      className='combobox unit-combobox'
      value={ingredientData.unitId}
      onChange={value => setIngredientData({ ...ingredientData, unitId: value ?? '' })}
      nullable
    >
      <Combobox.Input
        placeholder='Unité'
        className={`combobox-input ${error ? 'error' : ''}`}
        onChange={e => setUnitSearch(e.currentTarget.value)}
        displayValue={(id: string) => {
          const unit = units ? units[id] : null;
          if (!unit) return '';
          return getUnitName(unit, 1);
        }}
      />
      <Combobox.Options className='combobox-options'>
        {matchingUnits.length === 0 && unitSearch !== '' ? (
          <div className='no-match'>Aucune unité trouvée</div>
        ) : (
          matchingUnits.map(unit => (
            <Combobox.Option
              key={unit.id}
              value={unit.id}
              className={`combobox-option ${ingredientData.unitId ? 'has-option-selected' : ''}`}
            >
              {({ selected }) => (
                <>
                  {selected && (
                    <Icon name='check' className='check-icon' aria-hidden='true' />
                  )}
                  <span className='combobox-option-text'>{ getUnitNameById(units, unit.id) }</span>
                </>
              )}
            </Combobox.Option>
          ))
        )}
      </Combobox.Options>
    </Combobox>
  );
};
