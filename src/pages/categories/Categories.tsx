import { useState } from 'react';
import { createCategory } from '../../features/category/categorySlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import Category from './Category';
import Logo from '../../components/Logo/Logo';

import './Categories.scss';

const Categories = () => {
  const [categoryName, setCategoryName] = useState('');

  const { categories } = useAppSelector(state => state.category);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCategory(categoryName)).then(() => {
      alert(`La catégorie "${categoryName}" a bien été crée.`);
      setCategoryName('');
    });
  };

  return (
    <div className='categories container'>
      <Logo />

      <h1>Catégories</h1>

      <div className='category-list'>
        {categories && Object.keys(categories).map(key => {
          const name = categories[key];
          if (!name) return null;
          return <Category key={key} category={{ name, id: key }} />;
        })}
      </div>

      <div className='separator'></div>

      <div className='category-form'>
        <h2>Ajouter une catégorie</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Nom de la catégorie</label>
            <input
              type='text'
              id='name'
              required
              value={categoryName}
              onChange={e => setCategoryName(e.target.value)} />
          </div>

          <button>Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default Categories;
