import { useEffect, useRef, useState } from 'react';
import { IngredientDetailsWithId } from '../../types/ingredientDetails';
import {
  updateIngredientDetails,
  createIngredientDetails,
} from '../../helpers/ingredientDetails.helpers';
import { css } from '../../../styled-system/css';
import { wrap } from '../../../styled-system/patterns';

import { UnderlineInput } from '../../components/UnderlineInput';
import { CancelBtn } from '../../components/CancelBtn';
import { Button } from '../../components/Button';
import { ModalActions } from '../../components/Modal/ModalActions';

interface IngredientFormProps {
  ingredientToEdit?: IngredientDetailsWithId;
  close?: () => void;
}

export const IngredientDetailsForm = ({
  ingredientToEdit,
  close,
}: IngredientFormProps) => {
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
    <form onSubmit={handleSubmit} className={wrap({ gap: '1rem' })}>
      <UnderlineInput
        labelText='Nom'
        ref={inputRef}
        name='singular'
        type='text'
        required
        value={name}
        onChange={e => setName(e.currentTarget.value)}
        className={css({ flex: '1', minW: '14rem' })}
      />

      <UnderlineInput
        labelText='Pluriel (facultatif)'
        name='plural'
        type='text'
        value={plural}
        onChange={e => setPlural(e.currentTarget.value)}
        className={css({ flex: '1', minW: '14rem' })}
      />

      {ingredientToEdit ? (
        <ModalActions>
          <Button size='smd'>Modifier</Button>
          {close && <CancelBtn onClick={close} text='Annuler' />}
        </ModalActions>
      ) : (
        <Button fullWidth={true} mt='1.1rem'>
          Créer un ingrédient
        </Button>
      )}
    </form>
  );
};
