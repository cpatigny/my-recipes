import { useState } from 'react';
import { useIngredientsDetails } from '../../contexts/IngredientsDetailsContext';
import { IngredientDetailsWithId } from '../../types/ingredientDetails';
import { useRecipes } from '../../contexts/RecipesContext';
import { deleteIngredientDetails } from '../../helpers/ingredientDetails.helpers';
import { reverseObject } from '../../utils/utils';

import { AdminContainer } from '../../components/AdminContainer/AdminContainer';
import { IngredientsDetails } from './IngredientsDetails';
import { Modal } from '../../components/Modal/Modal';
import { IngredientDetailsForm } from './IngredientDetailsForm';
import { Block } from '../../components/Block/Block';

import './AdminIngredientsDetails.scss';

export const AdminIngredientsDetails = () => {
  const [ingredientToEdit, setIngredientToEdit] = useState<IngredientDetailsWithId | null>(null);

  const { recipes } = useRecipes();
  const { ingredientsDetails } = useIngredientsDetails();

  const closeEditForm = () => setIngredientToEdit(null);

  const handleDelete = (ingredientDetails: IngredientDetailsWithId) => {
    if (!window.confirm(`Supprimer "${ingredientDetails.name}" ?`)) {
      return;
    }

    if (recipes) deleteIngredientDetails(ingredientDetails.id, recipes);
  };

  let nbOfIngredients = 0;

  if (ingredientsDetails) {
    nbOfIngredients = Object.keys(ingredientsDetails).length;
  }

  return (
    <AdminContainer className='admin-ingredients'>
      <h1>Ingrédients</h1>

      <Block className='form-container'>
        <h2>Créer un ingrédient</h2>
        <IngredientDetailsForm />
      </Block>

      <Block>
        <h2 className='list-title'>Liste des ingrédients ({ nbOfIngredients })</h2>
        {ingredientsDetails && (
          <IngredientsDetails
            ingredients={reverseObject(ingredientsDetails)}
            setIngredientToEdit={setIngredientToEdit}
            handleDelete={handleDelete}
          />
        )}
      </Block>

      <Modal isShow={!!ingredientToEdit} close={closeEditForm} title='Modifier ingrédient'>
        {ingredientToEdit && (
          <IngredientDetailsForm ingredientToEdit={ingredientToEdit} close={closeEditForm} />
        )}
      </Modal>
    </AdminContainer>
  );
};
