import { RecipeIngredientFormData } from '../../../types/recipe';
import { useState } from 'react';
import { getMatchingUnits, getUnitName, getUnitNameById } from '../../../helpers/units.helpers';
import { Units } from '../../../types/unit';
import { cx } from '../../../../styled-system/css';
import { combobox } from '../../../recipes/combobox';

import { Icon } from '../../Icon';
import { Combobox } from '@headlessui/react';

interface UnitComboboxProps {
  ingredientData: RecipeIngredientFormData;
  setIngredientData: React.Dispatch<React.SetStateAction<RecipeIngredientFormData>>;
  units: Units | null;
  error: boolean;
  className?: string;
}

export const UnitCombobox = ({
  ingredientData, setIngredientData, units, error, className,
}: UnitComboboxProps) => {
  const [unitSearch, setUnitSearch] = useState('');

  const matchingUnits = getMatchingUnits(unitSearch, units);

  return (
    <Combobox
      as='div'
      value={ingredientData.unitId}
      onChange={value => setIngredientData({ ...ingredientData, unitId: value ?? '' })}
      nullable
      className={cx(
        className || '',
        combobox(),
      )}
    >
      <Combobox.Input
        placeholder='Unité'
        data-error={error}
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
              data-an-option-is-selected={!!ingredientData.unitId}
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
