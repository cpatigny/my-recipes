import { useEffect, useState } from 'react';
import { useRecipes } from '../../contexts/RecipesContext';
import { CategoryWithId } from '../../types/category';
import {
  countRecipesByCategory,
  deleteCategory,
} from '../../helpers/category.helpers';
import { confirm } from '../../utils/utils';
import { useToast } from '../../contexts/ToastContext';
import { css } from '../../../styled-system/css';

import { Icon } from '../../components/Icon';
import { AdminListItem } from '../../components/AdminList/AdminListItem';
import { Button } from '../../components/Button';
import { AdminActions } from '../../components/AdminActions';

interface AdminCategoryProps {
  category: CategoryWithId;
  setCategoryToEdit: React.Dispatch<
    React.SetStateAction<CategoryWithId | null>
  >;
}

export const AdminCategory = ({
  category,
  setCategoryToEdit,
}: AdminCategoryProps) => {
  const [nbRecipesWithCategory, setNbRecipesWithCategory] = useState(0);

  const { recipes } = useRecipes();
  const { toast } = useToast();

  useEffect(() => {
    if (recipes) {
      setNbRecipesWithCategory(countRecipesByCategory(recipes, category.id));
    }
  }, [recipes, category.id]);

  const wordToEnter = 'oui';
  const confirmText = `Êtes-vous sûr de vouloir supprimer la catégorie "${category.name}" ? (cette action est irréversible !) Écrivez "${wordToEnter}" pour confirmer :`;
  const onConfirm = async () => {
    if (recipes) {
      await deleteCategory({ recipes, category });
      toast.success('La catégorie a bien été supprimée.');
    }
  };

  return (
    <AdminListItem>
      <p>
        ({nbRecipesWithCategory}) {category.name}
      </p>

      <AdminActions>
        <Button
          visual='transparent'
          color='edit'
          size='md'
          circle={true}
          onClick={() => setCategoryToEdit(category)}
        >
          <Icon name='edit' fontSize='1.4rem' />
        </Button>
        <Button
          visual='transparent'
          color='danger'
          size='md'
          circle={true}
          onClick={() => confirm(confirmText, wordToEnter, onConfirm)}
          className={css({ color: 'danger' })}
        >
          <Icon name='delete_outline' fontSize='1.4rem' />
        </Button>
      </AdminActions>
    </AdminListItem>
  );
};
