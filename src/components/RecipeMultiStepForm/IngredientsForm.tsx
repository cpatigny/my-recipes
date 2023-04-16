import { Groups, RecipeIngredients, RecipeFormData } from '../../types/recipe';
import ModeSwitcher from './ModeSwitcher';
import { FormElements, MARKDOWN_MODE, Modes, NORMAL_MODE } from './RecipeMultiStepForm';

import ServingsMode from './ServingsMode';

interface IngredientsFormProps {
  groups?: Groups;
  ingredients: string | RecipeIngredients;
  nbServings?: string;
  servingsUnit?: string;
  recipeId: string;
  mode: Modes;
  setMode: (mode: Modes) => void;
  setFormData: React.Dispatch<React.SetStateAction<RecipeFormData>>;
  handleChange: (e: React.ChangeEvent<FormElements>) => void;
}

const IngredientsForm = ({
  groups, ingredients, nbServings, servingsUnit, mode, setMode, setFormData, handleChange, recipeId,
}: IngredientsFormProps) => (
  <div className='form-container ingredients-form'>
    <h2>Ingrédients</h2>
    <ModeSwitcher mode={mode} setMode={setMode} />
    {mode === NORMAL_MODE && (
      <ServingsMode
        groups={groups}
        ingredients={ingredients}
        nbServings={nbServings}
        servingsUnit={servingsUnit}
        setFormData={setFormData}
        recipeId={recipeId}
        handleChange={handleChange}
      />
    )}
    {mode === MARKDOWN_MODE && typeof ingredients === 'string' && (
      <div>
        <label htmlFor='ingredients'>Ingrédients</label>
        <textarea name='ingredients' id='ingredients' required value={ingredients} onChange={handleChange} />
      </div>
    )}
  </div>
);

export default IngredientsForm;
