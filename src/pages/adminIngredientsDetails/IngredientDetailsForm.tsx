import { useEffect, useRef, useState } from 'react';
import { IngredientDetailsWithId } from '../../types/ingredientDetails';
import { updateIngredientDetails, createIngredientDetails } from '../../helpers/ingredientDetails.helpers';

interface IngredientFormProps {
  ingredientToEdit?: IngredientDetailsWithId;
  close?: () => void;
}

const IngredientDetailsForm = ({ ingredientToEdit, close }: IngredientFormProps) => {
  const [singular, setSingular] = useState('');
  const [plural, setPlural] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!ingredientToEdit) return;

    setSingular(ingredientToEdit.singular);
    setPlural(ingredientToEdit.plural);
  }, [ingredientToEdit]);

  const reset = () => {
    setSingular('');
    setPlural('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (ingredientToEdit) {
      await updateIngredientDetails({ id: ingredientToEdit.id, singular, plural });
      if (close) close();
      return;
    }

    await createIngredientDetails({ singular, plural });
    reset();

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='singular'>Ingrédient (au <b>singulier</b>)</label>
        <input
          ref={inputRef}
          id='singular'
          type='text'
          required
          value={singular}
          onChange={e => setSingular(e.currentTarget.value)}
        />
      </div>
      <div>
        <label htmlFor='plural'>Ingrédient (au <b>pluriel</b>)</label>
        <input
          id='plural'
          type='text'
          required
          value={plural}
          onChange={e => setPlural(e.currentTarget.value)}
        />
      </div>
      <button>{ ingredientToEdit ? 'Modifier' : 'Créer un ingrédient' }</button>
    </form>
  );
};

export default IngredientDetailsForm;
