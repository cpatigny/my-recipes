import { useCallback, useEffect, useRef, useState } from 'react';
import {
  RecipeIngredientWithId,
  GroupWithIngredients,
  RecipeFormData,
  RecipeIngredients,
  Groups,
} from '../../../../types/recipe';
import {
  UniqueIdentifier,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DropAnimation,
  defaultDropAnimationSideEffects,
  DragOverEvent,
  DragEndEvent,
  Active,
  Over,
  closestCorners,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useRecipeMultiStepForm } from '../../../../contexts/RecipeMultiStepFormContext';
import { DEFAULT_GROUP, getGroupItems, sortGroupIdsByPosition } from '../../../../helpers/group.helpers';
import { IngredientAndGroupListProps } from '../IngredientAndGroupList';

import { GroupItem } from './GroupItem';
import { IngredientItem } from './IngredientItem';
import { DroppableGroup } from './DroppableGroup';
import { DefaultGroup } from './DefaultGroup';

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

const IngredientDragOverlay = ({ ingredient }: { ingredient: RecipeIngredientWithId | null }) => {
  if (!ingredient) {
    return null;
  }

  return (
    <IngredientItem
      ingredient={ingredient}
      style={{
        transform: 'scale(1.05)',
        boxShadow: '0 19px 38px rgba(0,0,0,0.20), 0 15px 12px rgba(0,0,0,0.15)',
      }}
      isDragging
    />
  );
};

const GroupDragOverlay = ({ group }: { group: GroupWithIngredients | null }) => {
  if (!group) {
    return null;
  }

  return (
    <GroupItem
      group={group}
      style={{
        transform: 'translate(0.8rem, 0.8rem)',
      }}
      isDragging
    >
      {group.ingredients.map(ingredient => (
        <IngredientItem
          key={ingredient.id}
          ingredient={ingredient}
          isDragging
        />
      ))}
    </GroupItem>
  );
};

export const GroupsContainers = ({
  deleteIngredient, deleteGroup, showEditIngredientForm, showEditGroupForm,
}: IngredientAndGroupListProps) => {
  const [groupsIds, setGroupsIds] = useState<UniqueIdentifier[]>([]);
  const [clonedItems, setClonedItems] = useState<RecipeFormData | null>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? groupsIds.includes(activeId) : false;
  const { recipeFormData, setRecipeFormData } = useRecipeMultiStepForm();
  const { groups, ingredients } = recipeFormData;
  const groupItems = getGroupItems(groups, ingredients);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findGroupById = useCallback((id: UniqueIdentifier) => {
    const matchingGroup = groupItems.find(group => group.id === id);
    return matchingGroup ?? null;
  }, [groupItems]);

  const findIngredientById = (id: UniqueIdentifier): RecipeIngredientWithId | null => {
    let matchingIngredient: RecipeIngredientWithId | null = null;

    groupItems.forEach(group => {
      const ingredient = group.ingredients.find(ing => ing.id === id);
      if (ingredient) {
        matchingIngredient = ingredient;
      }
    });

    return matchingIngredient;
  };

  const updateGroupsIds = (newGroups: Groups | null) => {
    const sortedNewGroupsIds = sortGroupIdsByPosition(newGroups);
    setGroupsIds([DEFAULT_GROUP.id, ...sortedNewGroupsIds]);
  };

  // find the group that contains the id
  // if it's the id of a group then return the matching group
  const findContainer = (id: UniqueIdentifier) => {
    const matchingGroup = findGroupById(id);
    // if it is the id of a group
    if (matchingGroup) {
      return matchingGroup;
    }

    // if it is the id of an ingredient
    // so return the group that has the ingredient (the container)
    return groupItems.find(group => group.ingredients.some(ingredient => ingredient.id === id));
  };

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setRecipeFormData(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  const getNewIndexOnDragOver = (
    overContainer: GroupWithIngredients, overId: UniqueIdentifier, over: Over, active: Active,
  ) => {
    const overItems = overContainer.ingredients;
    const overIndex = overItems.findIndex(ing => ing.id === overId);

    let newIndex: number;

    if (findGroupById(overId)) {
      newIndex = overItems.length + 1;
    } else {
      const isBelowOverItem = over
        && active.rect.current.translated
        && active.rect.current.translated.top
        > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
    }

    return newIndex;
  };

  // move the ingredient to its new group and remove it from the old one
  // if the ingredient has been dropped on the same group, updates its position
  const updateIngredients = (
    items: GroupWithIngredients[],
    newIndex: number,
    activeIngredient: RecipeIngredientWithId,
    overContainer: GroupWithIngredients,
    active: Active,
  ) => {
    const updatedIngredients: RecipeIngredients = {};

    items.forEach(group => {
      let newIngredients = [...group.ingredients];

      // if group has the ingredient we dragged, remove the ingredient from the old group
      // and update ingredient positions
      if (group.ingredients.find(ing => ing.id === active.id)) {
        newIngredients = group.ingredients
          .filter(ing => ing.id !== active.id)
          .map((ing, index) => ({ ...ing, position: index }));
      }

      // if group is the group we dropped the ingredient in
      if (group.id === overContainer.id) {
        // if group id is the default group id, set groupId property to false
        const groupId = group.id === DEFAULT_GROUP.id ? false : group.id;

        // add the ingredient at the right index and update its group
        newIngredients.splice(newIndex, 0, { ...activeIngredient, groupId });

        // list of ingredients which position needs to be updated
        const ingredientsWithPosToUpdate = newIngredients
          .filter(ing => {
            // because ingredients from default group have groupId set to false
            const overId = overContainer.id === DEFAULT_GROUP.id ? false : overContainer.id;
            return ing.groupId === overId;
          })
          .map((ing, index) => ({ ...ing, position: index }));

        // update position for ingredients in the new group
        const ingredientsWithoutPosToUpdate = newIngredients.filter(ing => (
          ing.groupId !== overContainer.id
        ));

        newIngredients = [
          ...ingredientsWithoutPosToUpdate,
          ...ingredientsWithPosToUpdate,
        ];
      }

      newIngredients.forEach(ing => {
        const { id, ...ingredient } = ing;
        updatedIngredients[id] = ingredient;
      });
    });

    return updatedIngredients;
  };

  // active is the element being dragged, so either a group or an ingredient
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;
    const isDraggingAGroup = findGroupById(active.id);

    // false if dragging an ingredient
    if (!overId || isDraggingAGroup) {
      return;
    }

    const overContainer = findContainer(overId);
    const activeContainer = findContainer(active.id);

    if (!overContainer || !activeContainer) {
      return;
    }

    // if the ingredient has been dropped on the same group
    if (activeContainer === overContainer) {
      return;
    }

    setRecipeFormData(draft => {
      const activeItems = activeContainer.ingredients;
      const activeIndex = activeItems.findIndex(ing => ing.id === active.id);
      const activeIngredient = activeItems[activeIndex];

      if (!activeIngredient) {
        return;
      }

      const newIndex = getNewIndexOnDragOver(overContainer, overId, over, active);
      recentlyMovedToNewContainer.current = true;
      draft.ingredients = updateIngredients(
        groupItems, newIndex, activeIngredient, overContainer, active,
      );
    });
  };

  const updateGroupsPosition = (groupsToUpdate: Groups | null, active: Active, over: Over) => {
    if (!groupsToUpdate) {
      return null;
    }

    let groupsToUpdateIds: UniqueIdentifier[] = Object.keys(groupsToUpdate);
    const activeIndex = groupsToUpdateIds.indexOf(active.id);
    const overIndex = groupsToUpdateIds.indexOf(over.id);
    groupsToUpdateIds = arrayMove(groupsToUpdateIds, activeIndex, overIndex);

    const updatedGroups: Groups = {};

    groupsToUpdateIds.forEach((id, index) => {
      const group = groupsToUpdate[id];
      if (!group) return;
      updatedGroups[id] = { ...group, position: index };
    });

    return updatedGroups;
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const isDraggingAGroup = findGroupById(active.id);

    if (isDraggingAGroup && over?.id) {
      // if we're dragging a group over an ingredient
      // happens when dragging over the default group
      if (findIngredientById(over.id)) return;

      setRecipeFormData(draft => {
        const updatedGroups = updateGroupsPosition(draft.groups, active, over);
        draft.groups = updatedGroups;
        updateGroupsIds(updatedGroups);
      });
    }

    const activeContainer = findContainer(active.id);

    if (!activeContainer) {
      setActiveId(null);
      return;
    }

    const overId = over?.id;

    if (!overId) {
      setActiveId(null);
      return;
    }

    const overContainer = findContainer(overId);

    if (overContainer) {
      const activeItems = activeContainer.ingredients;
      const overItems = overContainer.ingredients;

      // both activeIndex and overIndex will be -1 if dropping a group
      // because it'll search for the group id inside ingredient list
      const overIndex = overItems.findIndex(ing => ing.id === overId);
      const activeIndex = activeItems.findIndex(ing => ing.id === active.id);

      // if dropped item is at the same position than before being dragged
      // or if we're moving a group (-1 === -1) -> see above comments
      if (activeIndex === overIndex) {
        setActiveId(null);
        return;
      }

      setRecipeFormData(draft => {
        const activeIngredient = activeItems[activeIndex];
        if (!activeIngredient) return;
        draft.ingredients = updateIngredients(
          groupItems, overIndex, activeIngredient, overContainer, active,
        );
      });
    }

    setActiveId(null);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [groupItems]);

  useEffect(() => {
    updateGroupsIds(groups);
  }, [groups]);

  const showGroupOverlay = activeId && groupsIds.includes(activeId);
  const showIngredientOverlay = activeId && !groupsIds.includes(activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={({ active }) => {
        setActiveId(active.id);
        setClonedItems(recipeFormData);
      }}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={onDragCancel}
    >
      <div>
        <SortableContext
          items={groupsIds}
          strategy={verticalListSortingStrategy}
        >
          {groupsIds.map(groupId => {
            const group = findGroupById(groupId);
            if (!group) return null;
            if (group.id === DEFAULT_GROUP.id) {
              return (
                <DefaultGroup
                  key={group.id}
                  group={group}
                  deleteIngredient={deleteIngredient}
                  showEditIngredientForm={showEditIngredientForm}
                />
              );
            }
            return (
              <DroppableGroup
                key={group.id}
                group={group}
                handleDelete={deleteGroup}
                deleteIngredient={deleteIngredient}
                isSortingContainer={isSortingContainer}
                showEditIngredientForm={showEditIngredientForm}
                showEditGroupForm={showEditGroupForm}
              />
            );
          })}
        </SortableContext>
      </div>
      <DragOverlay className='group-containers' dropAnimation={dropAnimation} adjustScale={false}>
        {showGroupOverlay && (
          <GroupDragOverlay group={findGroupById(activeId)} />
        )}
        {showIngredientOverlay && (
          <IngredientDragOverlay ingredient={findIngredientById(activeId)} />
        )}
      </DragOverlay>
    </DndContext>
  );
};
