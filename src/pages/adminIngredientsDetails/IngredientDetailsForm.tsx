import { useEffect, useRef, useState } from 'react';
import { IngredientDetailsWithId } from '../../types/ingredientDetails';
import { updateIngredientDetails, createIngredientDetails } from '../../helpers/ingredientDetails.helpers';
import { UnderlineInput } from '../../components/UnderlineInput/UnderlineInput';

interface IngredientFormProps {
  ingredientToEdit?: IngredientDetailsWithId;
  close?: () => void;
}

export const IngredientDetailsForm = ({ ingredientToEdit, close }: IngredientFormProps) => {
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
      <UnderlineInput
        labelText='Singulier'
        ref={inputRef}
        name='singular'
        type='text'
        required
        value={singular}
        onChange={e => setSingular(e.currentTarget.value)}
      />

      <UnderlineInput
        labelText='Pluriel'
        name='plural'
        type='text'
        required
        value={plural}
        onChange={e => setPlural(e.currentTarget.value)}
      />
      <button>{ ingredientToEdit ? 'Modifier' : 'Créer un ingrédient' }</button>
    </form>
  );
};
