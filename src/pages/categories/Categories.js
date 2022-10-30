import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCategory } from '../../features/category/categorySlice';

import Category from './Category';
import Logo from '../../components/Logo/Logo';

import './Categories.scss';

const Categories = () => {
  const [categoryName, setCategoryName] = useState('');

  const { categories } = useSelector(state => state.category);

  const dispatch = useDispatch();

  const handleSubmit = e => {
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
        {Object.keys(categories).map(key => (
          <Category key={key} category={{ name: categories[key], id: key }} />
        ))}
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
