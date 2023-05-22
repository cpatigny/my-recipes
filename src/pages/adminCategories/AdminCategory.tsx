import { useEffect, useState } from 'react';
import { useRecipes } from '../../contexts/RecipesContext';
import { CategoryWithId } from '../../types/category';
import { countRecipesByCategory, deleteCategory } from '../../helpers/category.helpers';
import { confirm } from '../../utils';

import { Icon } from '../../components/Icon/Icon';

interface AdminCategoryProps {
  category: CategoryWithId;
  setCategoryToEdit: React.Dispatch<React.SetStateAction<CategoryWithId | null>>;
}

export const AdminCategory = ({ category, setCategoryToEdit }: AdminCategoryProps) => {
  const [nbRecipesWithCategory, setNbRecipesWithCategory] = useState(0);

  const { recipes } = useRecipes();

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
      alert('La catégorie a bien été supprimée.');
    }
  };

  return (
    <li className='admin-category'>
      <p>({ nbRecipesWithCategory }) { category.name }</p>

      <div className='actions delete-edit'>
        <button className='edit' onClick={() => setCategoryToEdit(category)}>
          <Icon name='edit' />
        </button>
        <button className='delete' onClick={() => confirm(confirmText, wordToEnter, onConfirm)}>
          <Icon name='delete_outline' />
        </button>
      </div>
    </li>
  );
};
