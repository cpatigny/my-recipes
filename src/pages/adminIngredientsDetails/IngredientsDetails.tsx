import {
  IngredientDetailsWithId, IngredientsDetails as IngredientsDetailsType,
} from '../../types/ingredientDetails';
import { css } from '../../../styled-system/css';

import { Icon } from '../../components/Icon';
import { AdminList } from '../../components/AdminList/AdminList';
import { AdminListItem } from '../../components/AdminList/AdminListItem';
import { AdminActions } from '../../components/AdminActions';
import { Button } from '../../components/Button';

interface IngredientsDetailsProps {
  ingredients: IngredientsDetailsType;
  setIngredientToEdit: React.Dispatch<React.SetStateAction<IngredientDetailsWithId | null>>;
  handleDelete: (ingredientDetails: IngredientDetailsWithId) => void;
}

export const IngredientsDetails = ({
  ingredients, setIngredientToEdit, handleDelete,
}: IngredientsDetailsProps) => (
  <AdminList>
    {Object.keys(ingredients).map(key => {
      const ingredient = ingredients[key];
      if (!ingredient) return null;
      return (
        <AdminListItem key={key}>
          <div>
            <p>nom : <b>{ ingredient.name }</b></p>
            {ingredient.plural && (
              <p>pluriel : <b>{ ingredient.plural }</b></p>
            )}
          </div>
          <AdminActions>
            <Button
              visual='transparent'
              color='edit'
              size='md'
              circle={true}
              onClick={() => setIngredientToEdit({ id: key, ...ingredient })}
            >
              <Icon name='edit' className={css({ fontSize: '1.4rem!' })} />
            </Button>
            <Button
              visual='transparent'
              color='danger'
              size='md'
              circle={true}
              onClick={() => handleDelete({ id: key, ...ingredient })}
            >
              <Icon name='delete_outline' className={css({ fontSize: '1.4rem!' })} />
            </Button>
          </AdminActions>
        </AdminListItem>
      );
    })}
  </AdminList>
);
