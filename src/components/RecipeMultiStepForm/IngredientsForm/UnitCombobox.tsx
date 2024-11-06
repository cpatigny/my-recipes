import {
  ComboBox,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
} from 'react-aria-components';
import { css } from '../../../../styled-system/css';
import {
  getMatchingUnits,
  getUnitNameById,
} from '../../../helpers/units.helpers';
import { RecipeIngredientFormData } from '../../../types/recipe';
import { Units, UnitWithId } from '../../../types/unit';

import { Icon } from '../../Icon';

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
    <ComboBox
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
      onInputChange={setUnitSearch}
      selectedKey={ingredientData.unitId}
      inputValue={unitSearch}
      className={className}
    >
      <Input
        placeholder='Unité'
        data-error={error}
        className={css({
          py: '0.375rem',
          borderBottom: '1px solid #dadce0',
          outline: 'none',
          transitionDuration: '200ms',
          _placeholder: { color: '#6D6D6D' },

          '&[data-error=true]': {
            borderColor: 'danger',
            _placeholder: { color: 'danger' },
          },

          '&[data-error=false]': {
            _focus: {
              borderColor: 'primary',
            },
          },
        })}
      />
      <Popover>
        <ListBox
          className={css({
            w: 'var(--trigger-width)',
            mt: '0.3rem',
            rounded: 'lg',
            bg: 'white',
            shadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
            overflowY: 'auto',
            maxH: '6rem',
          })}
        >
          {(unit: UnitWithId) => (
            <ListBoxItem
              key={unit.id}
              textValue={unit.singular}
              className={css({
                p: '0.3rem 0.8rem',
                w: '100%',
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                pos: 'relative',

                '&[data-focused]': {
                  bg: 'orange.450',
                  color: 'white',
                },

                '&[data-selected]': {
                  fontWeight: '600',
                },

                '&[data-focused][data-selected] .icon': {
                  color: 'white',
                },
              })}
            >
              <Icon
                name='check'
                aria-hidden='true'
                className={css({
                  display: 'none!',
                  pos: 'absolute',
                  color: 'orange.450',
                  fontSize: '1.2rem!',

                  '[data-selected] &': { display: 'block!' },
                })}
              />
              <span
                data-an-option-is-selected={!!ingredientData.unitId}
                className={css({
                  '&[data-an-option-is-selected=true]': { pl: '1.5rem' },
                })}
              >
                {getUnitNameById(units, unit.id)}
              </span>
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </ComboBox>
  );
};
