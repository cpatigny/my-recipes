import { forwardRef, memo, useEffect } from 'react';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import { RecipeIngredientWithId } from '../../../../types/recipe';
import { useIngredientsDetails } from '../../../../contexts/IngredientsDetailsContext';
import { useUnits } from '../../../../contexts/UnitsContext';
import { css } from '../../../../../styled-system/css';
import { center, flex } from '../../../../../styled-system/patterns';

import { IngredientText } from '../../../IngredientText';
import { Icon } from '../../../Icon';
import { DEFAULT_INGREDIENT } from './DefaultGroup';
import { Button } from '../../../Button';

export interface IngredientItemProps extends React.HTMLAttributes<HTMLLIElement> {
  listeners?: DraggableSyntheticListeners;
  style?: React.CSSProperties;
  ingredient: RecipeIngredientWithId;
  isOpacityEnabled?: boolean;
  isDragging?: boolean;
  deleteIngredient?: (key: string) => void;
  showEditIngredientForm?: (ingredient: RecipeIngredientWithId) => void;
}

export const IngredientItem = memo(
  forwardRef<HTMLLIElement, IngredientItemProps>(
    (
      {
        listeners,
        style,
        ingredient,
        isOpacityEnabled,
        isDragging,
        deleteIngredient,
        showEditIngredientForm,
        ...props
      },
      ref,
    ) => {
      const { ingredientsDetails } = useIngredientsDetails();
      const { units } = useUnits();

      useEffect(() => {
        if (!isDragging) {
          return undefined;
        }

        document.body.style.cursor = 'grabbing';

        return () => {
          document.body.style.cursor = '';
        };
      }, [isDragging]);

      const styles: React.CSSProperties = {
        opacity: isOpacityEnabled ? '0.5' : '1',
        ...style,
      };

      if (ingredient.id === DEFAULT_INGREDIENT.id) {
        return (
          <li
            ref={ref}
            className={css({ visibility: 'hidden', h: '0' })}
          >
            Ingrédient par défaut, ne peut pas être déplacé
          </li>
        );
      }

      return (
        <li
          {...props}
          style={styles}
          ref={ref}
          className={flex({
            align: 'center',
            justify: 'space-between',
            listStyle: 'none',
            bg: 'white',
            pr: '1.1rem',
            rounded: '0.8rem',
            shadow: '0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(34, 33, 81, 0.15)',
            w: '100%',
            '&:not(:last-child)': {
              mb: '1rem',
            },
          })}
        >
          <div
            {...listeners}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            className={css({
              w: '100%',
              p: '0.55rem 0 0.55rem 1.1rem',
            })}
          >
            <IngredientText
              ingredient={ingredient}
              ingredientsDetails={ingredientsDetails}
              units={units}
              fontSize='1rem'
            />
          </div>
          <div className={center({ gap: '0 0.4rem' })}>
            {showEditIngredientForm && (
              <Button
                circle={true}
                visual='grey'
                color='edit'
                type='button'
                onClick={() => showEditIngredientForm({ ...ingredient, id: ingredient.id })}
              >
                <Icon name='edit' className={css({ fontSize: '1.2rem!' })} />
              </Button>
            )}
            {deleteIngredient && (
              <Button
                circle={true}
                visual='grey'
                color='danger'
                type='button'
                onClick={() => deleteIngredient(ingredient.id)}
              >
                <Icon name='clear' className={css({ fontSize: '1.2rem!' })} />
              </Button>
            )}
          </div>
        </li>
      );
    },
  ),
);
