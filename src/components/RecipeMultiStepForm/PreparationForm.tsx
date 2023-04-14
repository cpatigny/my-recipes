import { FormElements } from './RecipeMultiStepForm';

interface PreparationFormProps {
  content: string;
  handleChange: (e: React.ChangeEvent<FormElements>) => void;
}

const PreparationForm = ({ content, handleChange }: PreparationFormProps) => (
  <div className='form-container preparation-form'>
    <h2>Préparation</h2>
    <div>
      <label htmlFor='content'>Préparation</label>
      <textarea name='content' id='content' required value={content} onChange={handleChange} />
    </div>
  </div>
);

export default PreparationForm;
