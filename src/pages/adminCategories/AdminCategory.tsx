import { useContext, useState } from 'react';
import { RecipesContext } from '../../providers/RecipesProvider';
import { CategoryWithId } from '../../types/category';
import confirm from '../../utils/confirm';
import { updateCategory, deleteCategory } from '../../utils/firebase/categoryMethods';

interface CategoryProps {
  category: CategoryWithId;
}

const AdminCategory = ({ category }: CategoryProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [categoryName, setCategoryName] = useState(category.name);

  const { recipes } = useContext(RecipesContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateCategory({ category, categoryName });
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
        <input type='text' value={categoryName} onChange={e => setCategoryName(e.target.value)} />

        <div className='actions'>
          <button type='submit'>
            <span className='material-icons-round'>check</span>
          </button>
          <button className='close-category-form' type='button' onClick={() => setShowEditForm(false)}>
            <span className='material-icons-round'>close</span>
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className='category'>
      <p>{ category.name }</p>

      <div className='actions'>
        <button className='edit-category' onClick={() => setShowEditForm(true)}>
          <span className='material-icons-round'>edit</span>
        </button>
        <button className='delete-category' onClick={() => confirm(confirmText, wordToEnter, onConfirm)}>
          <span className='material-icons-round'>delete_outline</span>
        </button>
      </div>
    </div>
  );
};

export default AdminCategory;
