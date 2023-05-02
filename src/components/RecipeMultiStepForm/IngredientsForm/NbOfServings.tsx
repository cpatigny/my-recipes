import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';
import UnderlineInput from '../../UnderlineInput/UnderlineInput';

interface NbOfServingsProps {
  handleStepSubmit: (e: React.FormEvent) => void;
}

const NbOfServings = ({ handleStepSubmit }: NbOfServingsProps) => {
  const { step, recipeFormData, handleChange } = useRecipeMultiStepForm();
  const { nbServings, servingsUnit } = recipeFormData;

  return (
    <div className='servings'>
      <p className='label'><b>Nombre de portions :</b></p>
      <form id={step.formId} className='d-flex items-center' onSubmit={handleStepSubmit}>
        <UnderlineInput
          labelText='XX'
          name='nbServings'
          type='number'
          min='1'
          step='1'
          required
          value={nbServings}
          onChange={handleChange} />
        <UnderlineInput
          labelText='Personnes, tartes, bols...'
          name='servingsUnit'
          type='text'
          required
          value={servingsUnit}
          onChange={handleChange} />
      </form>
      <i className='example'>Exemple : 2 personnes, 1 tarte, 4 bols...</i>
    </div>
  );
};

export default NbOfServings;
