import { useState } from 'react';
import { createIngredient } from '../../utils/firebase/ingredientMethods';
import { useIngredients } from '../../providers/IngredientsProvider';

import AdminContainer from '../../components/AdminContainer/AdminContainer';
import Ingredients from './Ingredients';

import './AdminIngredients.scss';

const AdminIngredients = () => {
  const [singular, setSingular] = useState('');
  const [plural, setPlural] = useState('');

  const { ingredients } = useIngredients();

  const reset = () => {
    setSingular('');
    setPlural('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createIngredient({ singular, plural });
    reset();
  };

  return (
    <AdminContainer className='admin-ingredients'>
      <h1>Ingrédients</h1>

      {ingredients && (
        <Ingredients ingredients={ingredients} />
      )}

      <div className='ingredient-form'>
        <h2>Créer un ingrédient</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='singular'>Ingrédient (au <b>singulier</b>)</label>
            <input
              id='singular'
              type='text'
              required
              value={singular}
              onChange={e => setSingular(e.currentTarget.value)}
            />
          </div>
          <div>
            <label htmlFor='plural'>Ingrédient (au <b>pluriel</b>)</label>
            <input
              id='plural'
              type='text'
              required
              value={plural}
              onChange={e => setPlural(e.currentTarget.value)}
            />
          </div>
          <button>Créer un ingrédient</button>
        </form>
      </div>
    </AdminContainer>
  );
};

export default AdminIngredients;
