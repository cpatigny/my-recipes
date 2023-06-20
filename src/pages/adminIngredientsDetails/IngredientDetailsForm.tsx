import { useEffect, useRef, useState } from 'react';
import { IngredientDetailsWithId } from '../../types/ingredientDetails';
import { updateIngredientDetails, createIngredientDetails } from '../../helpers/ingredientDetails.helpers';

import { UnderlineInput } from '../../components/UnderlineInput/UnderlineInput';
import { CancelBtn } from '../../components/CancelBtn/CancelBtn';

interface IngredientFormProps {
  ingredientToEdit?: IngredientDetailsWithId;
  close?: () => void;
}

export const IngredientDetailsForm = ({ ingredientToEdit, close }: IngredientFormProps) => {
  const [name, setName] = useState('');
  const [plural, setPlural] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!ingredientToEdit) return;

    setName(ingredientToEdit.name);
    setPlural(ingredientToEdit.plural ?? '');
  }, [ingredientToEdit]);

  const reset = () => {
    setName('');
    setPlural('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (ingredientToEdit) {
      await updateIngredientDetails({ id: ingredientToEdit.id, name, plural });
      if (close) close();
      return;
    }

    await createIngredientDetails({ name, plural });
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
        value={name}
        onChange={e => setName(e.currentTarget.value)}
      />

      <UnderlineInput
        labelText='Pluriel'
        name='plural'
        type='text'
        value={plural}
        onChange={e => setPlural(e.currentTarget.value)}
      />

      {ingredientToEdit ? (
        <div className='modal-actions'>
          <button className='btn-primary modal-button'>Modifier</button>
          {close && <CancelBtn onClick={close} text='Annuler' />}
        </div>
      ) : (
        <button>Créer un ingrédient</button>
      )}
    </form>
  );
};
