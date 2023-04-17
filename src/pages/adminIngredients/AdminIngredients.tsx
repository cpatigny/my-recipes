import { useState } from 'react';
import { useIngredients } from '../../providers/IngredientsProvider';
import { IngredientWithId } from '../../types/ingredient';

import AdminContainer from '../../components/AdminContainer/AdminContainer';
import Ingredients from './Ingredients';
import Modal from '../../components/Modal/Modal';

import './AdminIngredients.scss';
import IngredientForm from './IngredientForm';

const AdminIngredients = () => {
  const [ingredientToEdit, setIngredientToEdit] = useState<IngredientWithId | null>(null);

  const { ingredients } = useIngredients();

  const closeEditForm = () => setIngredientToEdit(null);

  return (
    <AdminContainer className='admin-ingredients'>
      <h1>Ingrédients</h1>

      {ingredients && (
        <Ingredients ingredients={ingredients} setIngredientToEdit={setIngredientToEdit} />
      )}

      <div className='ingredient-form'>
        <h2>Créer un ingrédient</h2>
        <IngredientForm />
      </div>

      <Modal isShow={!!ingredientToEdit} close={closeEditForm} title='Modifier ingrédient'>
        {ingredientToEdit && (
          <IngredientForm ingredientToEdit={ingredientToEdit} close={closeEditForm} />
        )}
      </Modal>
    </AdminContainer>
  );
};

export default AdminIngredients;
