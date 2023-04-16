import { GroupWithId, GroupWithIngredients, RecipeIngredientWithId } from '../../types/recipe';

import IngredientListItem from './IngredientListItem';

interface GroupListItemProps {
  group: GroupWithIngredients;
  deleteIngredient: (key: string) => void;
  showEditIngredientForm: (ingredient: RecipeIngredientWithId) => void;
  showEditGroupForm: (group: GroupWithId) => void;
  deleteGroup: (group: GroupWithIngredients) => void;
}

const GroupListItem = ({
  group, deleteIngredient, showEditIngredientForm, showEditGroupForm, deleteGroup,
}: GroupListItemProps) => {
  const groupToEdit = {
    id: group.id,
    position: group.position,
    name: group.name,
  };

  return (
    <div className='group-container'>
      <div className='group-header'>
        <p className='group-name'>{ group.name }</p>
        <div className='actions'>
          <button className='edit edit-group' type='button' onClick={() => showEditGroupForm(groupToEdit)}>
            <span className='material-icons-round'>edit</span>
          </button>
          <button className='delete delete-group' type='button' onClick={() => deleteGroup(group)}>
            <span className='material-icons-round'>clear</span>
          </button>
        </div>
      </div>
      <div className='group-ingredients'>
        {group.ingredients.length === 0 && (
          <p className='group-has-no-ingredients secondary'>Ce groupe ne contient aucun ingrédient</p>
        )}
        <ul className='group'>
          {group.ingredients.map(ingredient => (
            <IngredientListItem
              key={ingredient.id}
              id={ingredient.id}
              ingredient={ingredient}
              deleteIngredient={deleteIngredient}
              showEditIngredientForm={showEditIngredientForm}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupListItem;
