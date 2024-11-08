import { useState } from 'react';
import { css } from '../../../styled-system/css';
import { useIngredientsDetails } from '../../contexts/IngredientsDetailsContext';
import { useRecipes } from '../../contexts/RecipesContext';
import { deleteIngredientDetails } from '../../helpers/ingredientDetails.helpers';
import { blockTitle } from '../../recipes/blockTitle';
import { IngredientDetailsWithId } from '../../types/ingredientDetails';
import { reverseObject } from '../../utils/utils';

import { AdminContainer } from '../../components/AdminContainer';
import { Block } from '../../components/Block';
import { MyDialog } from '../../components/Modal/MyDialog';
import { MyModal } from '../../components/Modal/MyModal';
import { MyModalHeading } from '../../components/Modal/MyModalHeading';
import { MyModalOverlay } from '../../components/Modal/MyModalOverlay';
import { IngredientDetailsForm } from './IngredientDetailsForm';
import { IngredientsDetails } from './IngredientsDetails';

export const AdminIngredientsDetails = () => {
  const [ingredientToEdit, setIngredientToEdit] =
    useState<IngredientDetailsWithId | null>(null);

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
    <AdminContainer>
      <h1 className={css({ fontSize: 'pageTitle' })}>Ingrédients</h1>

      <Block>
        <h2 className={blockTitle()}>Créer un ingrédient</h2>
        <IngredientDetailsForm />
      </Block>

      <Block>
        <h2 className={blockTitle()}>
          Liste des ingrédients ({nbOfIngredients})
        </h2>
        {ingredientsDetails && (
          <IngredientsDetails
            ingredients={reverseObject(ingredientsDetails)}
            setIngredientToEdit={setIngredientToEdit}
            handleDelete={handleDelete}
          />
        )}
      </Block>

      <MyModalOverlay
        isOpen={!!ingredientToEdit}
        onOpenChange={isOpen => {
          if (!isOpen) closeEditForm();
        }}
      >
        <MyModal>
          <MyDialog>
            {({ close }) => (
              <>
                <MyModalHeading>Modifier ingrédient</MyModalHeading>
                {ingredientToEdit && (
                  <IngredientDetailsForm
                    ingredientToEdit={ingredientToEdit}
                    close={() => {
                      closeEditForm();
                      close();
                    }}
                  />
                )}
              </>
            )}
          </MyDialog>
        </MyModal>
      </MyModalOverlay>

      {/* <Modal
        isShow={!!ingredientToEdit}
        onClose={closeEditForm}
        title='Modifier ingrédient'
      >
        {ingredientToEdit && (
          <IngredientDetailsForm
            ingredientToEdit={ingredientToEdit}
            close={closeEditForm}
          />
        )}
      </Modal> */}
    </AdminContainer>
  );
};
