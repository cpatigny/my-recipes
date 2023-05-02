import { useEffect, useState } from 'react';
import { useRecipes } from '../../contexts/RecipesContext';
import { CategoryWithId } from '../../types/category';
import { countRecipesByCategory, updateCategory, deleteCategory } from '../../helpers/category.helpers';
import { confirm, slugify } from '../../utils';

import Icon from '../../components/Icon/Icon';

interface AdminCategoryProps {
  category: CategoryWithId;
}

const AdminCategory = ({ category }: AdminCategoryProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [name, setName] = useState(category.name);
  const [slug, setSlug] = useState(category.slug);
  const [nbRecipesWithCategory, setNbRecipesWithCategory] = useState(0);

  const { recipes } = useRecipes();

  useEffect(() => {
    if (recipes) {
      setNbRecipesWithCategory(countRecipesByCategory(recipes, category.id));
    }
  }, [recipes, category.id]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setName(value);
    setSlug(slugify(value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateCategory({
      id: category.id,
      name,
      slug,
    });

    setShowEditForm(false);
  };

  const wordToEnter = 'oui';
  const confirmText = `Êtes-vous sûr de vouloir supprimer la catégorie "${category.name}" ? (cette action est irréversible !) Écrivez "${wordToEnter}" pour confirmer :`;
  const onConfirm = async () => {
    if (recipes) {
      await deleteCategory({ recipes, category });
      alert('La catégorie a bien été supprimée.');
    }
  };

  if (showEditForm) {
    return (
      <form className='category-edit-form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Nom de la catégorie</label>
          <input id='name' type='text' value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor='slug'>Slug</label>
          <input id='slug' type='text' value={slug} onChange={e => setSlug(slugify(e.currentTarget.value))} />
        </div>

        <div className='actions'>
          <button type='submit'>
            <Icon name='check' />
            Valider
          </button>
          <button className='close-category-form' type='button' onClick={() => setShowEditForm(false)}>
            <Icon name='close' />
            Annuler
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className='admin-category'>
      <p>({ nbRecipesWithCategory }) { category.name }</p>

      <div className='actions delete-edit'>
        <button className='edit' onClick={() => setShowEditForm(true)}>
          <Icon name='edit' />
        </button>
        <button className='delete' onClick={() => confirm(confirmText, wordToEnter, onConfirm)}>
          <Icon name='delete_outline' />
        </button>
      </div>
    </div>
  );
};

export default AdminCategory;
