import UnderlineInput from '../UnderlineInput/UnderlineInput';
import { FormElements } from './RecipeMultiStepForm';

interface NbOfServingsProps {
  nbServings?: string;
  servingsUnit?: string;
  handleChange: (e: React.ChangeEvent<FormElements>) => void;
}

const NbOfServings = ({ nbServings, servingsUnit, handleChange }: NbOfServingsProps) => (
  <div className='servings'>
    <p className='label'><b>Nombre de portions :</b></p>
    <div className='d-flex items-center'>
      <UnderlineInput
        labelText='XX'
        name='nbServings'
        type='number'
        min='1'
        step='1'
        required
        value={nbServings}
        onChange={handleChange}
      />
      <UnderlineInput
        labelText='Personnes, tartes, bols...'
        name='servingsUnit'
        type='text'
        required
        value={servingsUnit}
        onChange={handleChange}
      />
    </div>
    <i className='example'>Exemple : 2 personnes, 1 tarte, 4 bols...</i>
  </div>
);

export default NbOfServings;
