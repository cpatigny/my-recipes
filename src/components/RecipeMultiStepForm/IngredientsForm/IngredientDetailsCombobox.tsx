import { css } from '../../../../styled-system/css';
import {
  getIngredientDetailsName,
  getMatchingIngredientsDetails,
} from '../../../helpers/ingredientDetails.helpers';
import {
  IngredientDetailsWithId,
  IngredientsDetails,
} from '../../../types/ingredientDetails';
import { RecipeIngredientFormData } from '../../../types/recipe';

import {
  ComboBox,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
} from 'react-aria-components';
import { Icon } from '../../Icon';

interface IngredientDetailsComboboxProps {
  ingredientData: RecipeIngredientFormData;
  setIngredientData: React.Dispatch<
    React.SetStateAction<RecipeIngredientFormData>
  >;
  ingredientsDetails: IngredientsDetails | null;
  ingredientSearch: string;
  setIngredientSearch: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
  className?: string;
}

export const IngredientDetailsCombobox = ({
  ingredientData,
  setIngredientData,
  ingredientsDetails,
  ingredientSearch,
  setIngredientSearch,
  error,
  className,
}: IngredientDetailsComboboxProps) => {
  const matchingIngredients = getMatchingIngredientsDetails(
    ingredientSearch,
    ingredientsDetails,
  );

  return (
    <ComboBox
      aria-label='Sélectionner un ingrédient'
      items={matchingIngredients}
      onSelectionChange={value => {
        setIngredientData({
          ...ingredientData,
          detailsId: value?.toString() || '',
        });

        setIngredientSearch(
          getIngredientDetailsName(
            ingredientsDetails,
            value ? value.toString() : '',
          ),
        );
      }}
      onInputChange={setIngredientSearch}
      selectedKey={ingredientData.detailsId}
      inputValue={ingredientSearch}
      className={className}
    >
      <Input
        placeholder='Ingrédient'
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
          {(ingredient: IngredientDetailsWithId) => (
            <ListBoxItem
              key={ingredient.id}
              textValue={ingredient.name}
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
                data-an-option-is-selected={!!ingredientData.detailsId}
                className={css({
                  '&[data-an-option-is-selected=true]': { pl: '1.5rem' },
                })}
              >
                {ingredient.name}
              </span>
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </ComboBox>
  );
};
