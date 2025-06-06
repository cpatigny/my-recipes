import { Checkbox } from 'react-aria-components';
import { css } from '../../../styled-system/css';
import { flex, square } from '../../../styled-system/patterns';
import { IngredientText } from '../../components/IngredientText';
import { IngredientsDetails } from '../../types/ingredientDetails';
import { RecipeIngredientWithId } from '../../types/recipe';
import { Units } from '../../types/unit';

interface IngredientProps {
  ingredient: RecipeIngredientWithId;
  ingredientsDetails: IngredientsDetails | null;
  units: Units | null;
  servingRatio?: number;
}

export const Ingredient = ({
  ingredient,
  ingredientsDetails,
  units,
  servingRatio,
}: IngredientProps) => {
  return (
    <li>
      <Checkbox
        className={flex({ align: 'center', mb: '1.25rem', fontSize: '1.2rem' })}
      >
        {({ isSelected, isFocused }) => (
          <>
            <div
              data-focused={isFocused}
              data-selected={isSelected}
              className={square({
                size: '1.125rem',
                bg: 'transparent',
                border: '2px solid rgba(0, 0, 0, 0.65)',
                rounded: '0.1875rem',
                pos: 'relative',
                p: '0',
                '[data-focused=true]&': {
                  outline: '2px solid #000',
                  outlineOffset: '3px',
                },
                '[data-selected=true]&': {
                  borderColor: 'transparent',
                },
              })}
            >
              {isSelected && (
                <div
                  className={css({
                    pos: 'absolute',
                    top: '0',
                    bottom: '0',
                    left: '0',
                    right: '0',
                  })}
                >
                  <div
                    className={css({
                      pos: 'absolute',
                      top: '-3px',
                      left: '3px',
                      h: '1rem',
                      w: '0.5rem',
                      borderWidth: '0 2px 2px 0',
                      borderColor: 'primary',
                      transform: 'rotate(45deg)',
                    })}
                  />
                </div>
              )}
            </div>
            <div
              className={css({
                flex: '1',
                cursor: 'pointer',
                pl: '1.125rem',
              })}
            >
              <IngredientText
                ingredient={ingredient}
                ingredientsDetails={ingredientsDetails}
                units={units}
                servingRatio={servingRatio}
              />
            </div>
          </>
        )}
      </Checkbox>
    </li>
  );
};
