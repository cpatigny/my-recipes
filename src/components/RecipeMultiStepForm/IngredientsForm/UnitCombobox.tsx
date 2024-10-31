import { useState } from 'react';
import { cx } from '../../../../styled-system/css';
import {
  getMatchingUnits,
  getUnitName,
  getUnitNameById,
} from '../../../helpers/units.helpers';
import { combobox } from '../../../recipes/combobox';
import { RecipeIngredientFormData } from '../../../types/recipe';
import { Units } from '../../../types/unit';

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { Icon } from '../../Icon';

interface UnitComboboxProps {
  ingredientData: RecipeIngredientFormData;
  setIngredientData: React.Dispatch<
    React.SetStateAction<RecipeIngredientFormData>
  >;
  units: Units | null;
  error: boolean;
  className?: string;
}

export const UnitCombobox = ({
  ingredientData,
  setIngredientData,
  units,
  error,
  className,
}: UnitComboboxProps) => {
  const [unitSearch, setUnitSearch] = useState('');

  const matchingUnits = getMatchingUnits(unitSearch, units);

  return (
    <Combobox
      as='div'
      value={ingredientData.unitId}
      onChange={value =>
        setIngredientData({ ...ingredientData, unitId: value ?? '' })
      }
      className={cx(className || '', combobox())}
    >
      <ComboboxInput
        placeholder='Unité'
        data-error={error}
        onChange={e => setUnitSearch(e.currentTarget.value)}
        displayValue={(id: string) => {
          const unit = units ? units[id] : null;
          if (!unit) return '';
          return getUnitName(unit, 1);
        }}
      />
      <ComboboxOptions>
        {matchingUnits.length === 0 && unitSearch !== '' ? (
          <p className='no-match'>Aucune unité trouvée</p>
        ) : (
          matchingUnits.map(unit => (
            <ComboboxOption
              key={unit.id}
              value={unit.id}
              data-an-option-is-selected={!!ingredientData.unitId}
            >
              {({ selected }) => (
                <>
                  {selected && <Icon name='check' aria-hidden='true' />}
                  <span>{getUnitNameById(units, unit.id)}</span>
                </>
              )}
            </ComboboxOption>
          ))
        )}
      </ComboboxOptions>
    </Combobox>
  );
};
