import { forwardRef, memo, useEffect } from 'react';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import { RecipeIngredientWithId } from '../../../../types/recipe';
import { useIngredientsDetails } from '../../../../contexts/IngredientsDetailsContext';
import { useUnits } from '../../../../contexts/UnitsContext';

import IngredientText from '../../../IngredientText/IngredientText';
import Icon from '../../../Icon/Icon';
import { DEFAULT_INGREDIENT } from './DefaultGroup';

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
          <li className='default-ingredient' ref={ref}>Ingrédient par défaut, ne peut pas être déplacé</li>
        );
      }

      return (
        <li
          {...props}
          style={styles}
          ref={ref}
          className='ingredient'
        >
          <div {...listeners} style={{ cursor: isDragging ? 'grabbing' : 'grab' }} className='draggable'>
            <IngredientText
              ingredient={ingredient}
              ingredientsDetails={ingredientsDetails}
              units={units}
            />
          </div>
          <div className='actions'>
            {showEditIngredientForm && (
              <button
                className='edit edit-ingredient'
                type='button'
                onClick={() => showEditIngredientForm({ ...ingredient, id: ingredient.id })}
              >
                <Icon name='edit' />
              </button>
            )}
            {deleteIngredient && (
              <button
                className='delete delete-ingredient'
                type='button'
                onClick={() => deleteIngredient(ingredient.id)}
              >
                <Icon name='clear' />
              </button>
            )}
          </div>
        </li>
      );
    },
  ),
);
