import { Ingredients } from '../../types/recipe';

interface AddGroupProps {
  ingredients: string | Ingredients;
  showGroupForm: () => void;
}

const AddGroup = ({ ingredients, showGroupForm }: AddGroupProps) => {
  const atLeastTwoIngredients = typeof ingredients === 'object' && Object.keys(ingredients).length >= 2;

  return (
    <div className='add-group'>
      <p className='label'><b>Créer un groupe d&apos;ingrédients :</b></p>
      { atLeastTwoIngredients ? (
        <button className='btn-primary' type='button' onClick={showGroupForm}>Créer un groupe</button>
      ) : (
        <p className='secondary'>Vous devez ajouter au moins <b>2 ingrédients</b> pour pouvoir créer un groupe</p>
      )}
    </div>
  );
};

export default AddGroup;
