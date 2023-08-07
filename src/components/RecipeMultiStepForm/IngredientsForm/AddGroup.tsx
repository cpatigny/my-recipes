import { RecipeIngredients } from '../../../types/recipe';

import { Block } from '../../Block';
import { Button } from '../../Button';
import { SecondaryText } from '../../SecondaryText';

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
        <Button size='md' py='0.6rem' mt='1.3rem' type='button' onClick={showGroupForm}>
          Créer un groupe
        </Button>
      ) : (
        <SecondaryText>
          Vous devez ajouter au moins <b>2 ingrédients</b> pour pouvoir créer un groupe
        </SecondaryText>
      )}
    </Block>
  );
};
