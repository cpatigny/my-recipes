import {
  getMatchingUnits,
  getUnitNameById,
} from '../../../helpers/units.helpers';
import { RecipeIngredientFormData } from '../../../types/recipe';
import { Units, UnitWithId } from '../../../types/unit';

import MyCombobox from '../../Form/MyCombobox';
import MyListBox from '../../Form/MyListBox';
import MyListBoxItem from '../../Form/MyListBoxItem';

interface UnitComboboxProps {
  ingredientData: RecipeIngredientFormData;
  setIngredientData: React.Dispatch<
    React.SetStateAction<RecipeIngredientFormData>
  >;
  units: Units | null;
  unitSearch: string;
  setUnitSearch: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
  className?: string;
}

export const UnitCombobox = ({
  ingredientData,
  setIngredientData,
  units,
  unitSearch,
  setUnitSearch,
  error,
  className,
}: UnitComboboxProps) => {
  const matchingUnits = getMatchingUnits(unitSearch, units);

  return (
    <MyCombobox
      aria-label='Sélectionner une unité'
      items={matchingUnits}
      onSelectionChange={unitId => {
        setIngredientData({
          ...ingredientData,
          unitId: unitId?.toString() || '',
        });

        setUnitSearch(() => {
          if (!units || !unitId) {
            return '';
          }
          const unit = units[unitId.toString()];
          if (!unit) {
            return '';
          }

          return unit.singular;
        });
      }}
      onInputChange={value => {
        if (value === '') {
          setIngredientData({ ...ingredientData, unitId: '' });
        }
        setUnitSearch(value);
      }}
      selectedKey={ingredientData.unitId}
      inputValue={unitSearch}
      placeholder='Unité'
      error={error}
      className={className}
    >
      <MyListBox>
        {(unit: UnitWithId) => (
          <MyListBoxItem
            key={unit.id}
            textValue={unit.singular}
            anOptionIsSelected={!!ingredientData.unitId}
          >
            {getUnitNameById(units, unit.id)}
          </MyListBoxItem>
        )}
      </MyListBox>
    </MyCombobox>
  );
};
