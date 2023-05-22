import { forwardRef, useEffect } from 'react';
import { GroupWithId, GroupWithIngredients } from '../../../../types/recipe';

import { Handle } from './Handle';
import { Delete } from './Delete';
import { Icon } from '../../../Icon/Icon';

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
        className={`group ${hover ? 'is-hover' : ''}`}
        style={styles}
      >
        <div className='group-header'>
          <span>{ group.name }</span>
          <div className='actions'>
            {showEditGroupForm && (
              <button className='edit' onClick={() => showEditGroupForm(group)}>
                <Icon name='edit' />
              </button>
            )}
            {/* handleDelete will be undefined when using Container for DragOverlay */}
            {handleDelete && <Delete onClick={handleDelete} />}
            <Handle {...handleProps} />
          </div>
        </div>
        <div className='group-ingredients'>
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
