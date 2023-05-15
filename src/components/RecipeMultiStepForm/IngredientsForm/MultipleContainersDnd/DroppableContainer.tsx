import { UniqueIdentifier } from '@dnd-kit/core';
import { AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GroupWithId, RecipeIngredientWithId } from '../../../../types/recipe';

import { GroupItem, GroupItemProps } from './GroupItem';

// to animate deleting a group container
const animateLayoutChanges: AnimateLayoutChanges = args => (
  defaultAnimateLayoutChanges({ ...args, wasDragging: true })
);

interface DroppableContainerProps extends GroupItemProps {
  disabled?: boolean;
  id: UniqueIdentifier;
  ingredientItems: RecipeIngredientWithId[];
  style?: React.CSSProperties;
  showEditGroupForm?: (group: GroupWithId) => void;
}

export const DroppableContainer = ({
  children,
  disabled,
  id,
  ingredientItems,
  style,
  showEditGroupForm,
  ...props
}: DroppableContainerProps) => {
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform,
  } = useSortable({
    id,
    data: {
      type: 'container',
      children: ingredientItems,
    },
    animateLayoutChanges,
  });

  const isOverContainer = over
    ? (id === over.id && active?.data.current?.type !== 'container')
    || ingredientItems.some(ingredient => ingredient.id === over.id)
    : false;

  const styles = {
    ...style,
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <GroupItem
      ref={disabled ? undefined : setNodeRef}
      style={styles}
      hover={isOverContainer}
      showEditGroupForm={showEditGroupForm}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      {...props}
    >
      {children}
    </GroupItem>
  );
};
