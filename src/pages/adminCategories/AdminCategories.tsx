import { useState } from 'react';
import { useCategories } from '../../contexts/CategoriesContext';
import { createCategory } from '../../helpers/category.helpers';
import { slugify } from '../../utils';

import AdminCategoryList from './AdminCategoryList';
import AdminContainer from '../../components/AdminContainer/AdminContainer';

import './AdminCategories.scss';

const AdminCategories = () => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  const { categories } = useCategories();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setName(value);
    setSlug(slugify(value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createCategory({ name, slug });
    alert(`La catégorie "${name}" a bien été crée.`);
    setName('');
    setSlug('');
  };

  return (
    <AdminContainer className='admin-categories'>
      <h1>Catégories</h1>

      <AdminCategoryList categories={categories} />

      <div className='category-form'>
        <h2>Ajouter une catégorie</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Nom de la catégorie</label>
            <input
              type='text'
              id='name'
              required
              value={name}
              onChange={handleNameChange} />
          </div>

          <div>
            <label htmlFor='slug'>Slug</label>
            <input
              type='text'
              id='slug'
              required
              value={slug}
              onChange={e => setSlug(slugify(e.currentTarget.value))} />
          </div>

          <button>Ajouter</button>
        </form>
      </div>
    </AdminContainer>
  );
};

export default AdminCategories;
