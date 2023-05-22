import { RecipeIngredients } from '../../../types/recipe';

import { Block } from '../../Block/Block';

interface AddGroupProps {
  ingredients: string | RecipeIngredients;
  showGroupForm: () => void;
}

export const AddGroup = ({ ingredients, showGroupForm }: AddGroupProps) => {
  const atLeastTwoIngredients = Object.keys(ingredients).length >= 2;

  return (
    <Block className='add-group'>
      <p className='label'><b>Créer un groupe d&apos;ingrédients :</b></p>
      { atLeastTwoIngredients ? (
        <button className='btn-primary' type='button' onClick={showGroupForm}>Créer un groupe</button>
      ) : (
        <p className='secondary'>Vous devez ajouter au moins <b>2 ingrédients</b> pour pouvoir créer un groupe</p>
      )}
    </Block>
  );
};
