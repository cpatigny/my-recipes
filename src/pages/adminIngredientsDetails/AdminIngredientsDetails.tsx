import { useState } from 'react';
import { useIngredientsDetails } from '../../contexts/IngredientsDetailsContext';
import { IngredientDetailsWithId } from '../../types/ingredientDetails';
import { useRecipes } from '../../contexts/RecipesContext';
import { deleteIngredientDetails } from '../../helpers/ingredientDetails.helpers';

import AdminContainer from '../../components/AdminContainer/AdminContainer';
import IngredientsDetails from './IngredientsDetails';
import Modal from '../../components/Modal/Modal';
import IngredientDetailsForm from './IngredientDetailsForm';

const AdminIngredientsDetails = () => {
  const [ingredientToEdit, setIngredientToEdit] = useState<IngredientDetailsWithId | null>(null);

  const { recipes } = useRecipes();
  const { ingredientsDetails } = useIngredientsDetails();

  const closeEditForm = () => setIngredientToEdit(null);

  const handleDelete = (ingredientDetails: IngredientDetailsWithId) => {
    if (!window.confirm(`Supprimer "${ingredientDetails.singular}" ?`)) {
      return;
    }

    if (recipes) deleteIngredientDetails(ingredientDetails.id, recipes);
  };

  return (
    <AdminContainer className='admin-ingredients'>
      <h1>Ingrédients</h1>

      {ingredientsDetails && (
        <IngredientsDetails
          ingredients={ingredientsDetails}
          setIngredientToEdit={setIngredientToEdit}
          handleDelete={handleDelete}
        />
      )}

      <div className='ingredient-form'>
        <h2>Créer un ingrédient</h2>
        <IngredientDetailsForm />
      </div>

      <Modal isShow={!!ingredientToEdit} close={closeEditForm} title='Modifier ingrédient'>
        {ingredientToEdit && (
          <IngredientDetailsForm ingredientToEdit={ingredientToEdit} close={closeEditForm} />
        )}
      </Modal>
    </AdminContainer>
  );
};

export default AdminIngredientsDetails;
