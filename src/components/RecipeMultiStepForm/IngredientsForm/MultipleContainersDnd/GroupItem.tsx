import { forwardRef, useEffect } from 'react';
import { GroupWithId, GroupWithIngredients } from '../../../../types/recipe';
import { css } from '../../../../../styled-system/css';
import { flex } from '../../../../../styled-system/patterns';

import { Handle } from './Handle';
import { Delete } from './Delete';
import { Icon } from '../../../Icon';
import { Button } from '../../../Button';

export interface GroupItemProps {
  children: React.ReactNode;
  group: GroupWithIngredients;
  style?: React.CSSProperties;
  hover?: boolean;
  handleProps?: React.HTMLAttributes<unknown>;
  isDragging?: boolean;
  handleDelete?: () => void;
  showEditGroupForm?: (group: GroupWithId) => void;
}

const GroupItem = forwardRef<HTMLDivElement, GroupItemProps>(
  (
    {
      children,
      handleProps,
      hover,
      handleDelete,
      group,
      style,
      isDragging,
      showEditGroupForm,
      ...props
    }: GroupItemProps,
    ref,
  ) => {
    useEffect(() => {
      if (!isDragging) {
        return undefined;
      }

      document.body.style.cursor = 'grab';

      return () => {
        document.body.style.cursor = '';
      };
    }, [isDragging]);

    const styles = {
      ...style,
      boxShadow: isDragging ? 'rgba(99, 99, 99, 0.15) 0px 2px 8px 0px' : '',
    };

    const noIngredients = group.ingredients.length === 0;

    return (
      <div
        {...props}
        ref={ref}
        className={css({
          border: '1px solid rgba(0, 0, 0, 0.1)',
          rounded: '1rem',
          overflow: 'hidden',

          '&:not(:last-child)': {
            mb: '1.5rem',
          },
        })}
        style={styles}
      >
        <div
          className={flex({
            justify: 'space-between',
            align: 'center',
            p: '0.4rem 0.6rem 0.4rem 1rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            bg: 'white',
            rounded: '1rem 1rem 0 0',
            fontSize: '1.1rem',
          })}
        >
          <span>{ group.name }</span>
          <div className={flex({ align: 'center' })}>
            {showEditGroupForm && (
              <Button
                circle={true}
                visual='grey'
                color='edit'
                onClick={() => showEditGroupForm(group)}
              >
                <Icon name='edit' className={css({ fontSize: '1.2rem!' })} />
              </Button>
            )}
            {/* handleDelete will be undefined when using Container for DragOverlay */}
            {handleDelete && <Delete onClick={handleDelete} className={css({ ml: '0.7rem' })} />}
            <Handle {...handleProps} className={css({ ml: '0.7rem' })} />
          </div>
        </div>
        <div
          data-hovering-group-while-dragging={!!hover}
          className={css({
            p: '0.8rem 1rem',
            bg: '#f9f9f9',
            rounded: '0 0 0.8rem 0.8rem',
            transitionDuration: '200ms',

            '&[data-hovering-group-while-dragging=true]': {
              bg: '#f3f3f3',
            },
          })}
        >
          {noIngredients ? (
            <p className='group-has-no-ingredients secondary'>Ce groupe ne contient aucun ingrédient</p>
          ) : (
            <ul>{ children }</ul>
          )}
        </div>
      </div>
    );
  },
);

GroupItem.displayName = 'GroupItem';

export { GroupItem };
