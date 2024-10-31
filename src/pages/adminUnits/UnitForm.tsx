import { useEffect, useRef, useState } from 'react';
import { UnitWithId } from '../../types/unit';
import { updateUnit, createUnit } from '../../helpers/units.helpers';
import { css } from '../../../styled-system/css';
import { wrap } from '../../../styled-system/patterns';

import { UnderlineInput } from '../../components/UnderlineInput';
import { CancelBtn } from '../../components/CancelBtn';
import { Button } from '../../components/Button';
import { ModalActions } from '../../components/Modal/ModalActions';

interface UnitFormData {
  singular: string;
  plural: string;
  symbol: string;
}

interface UnitFormProps {
  unitToEdit?: UnitWithId | null;
  close?: () => void;
}

export const UnitForm = ({ unitToEdit, close }: UnitFormProps) => {
  const DEFAULT_DATA: UnitFormData = {
    singular: '',
    plural: '',
    symbol: '',
  };

  const [unitFormData, setUnitFormData] = useState(DEFAULT_DATA);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!unitToEdit) return;

    setUnitFormData({
      ...unitToEdit,
      symbol: unitToEdit.symbol ? unitToEdit.symbol : '',
    });
  }, [unitToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setUnitFormData({
      ...unitFormData,
      [name]: value,
    });
  };

  const reset = () => setUnitFormData(DEFAULT_DATA);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (unitToEdit) {
      updateUnit({
        ...unitFormData,
        id: unitToEdit.id,
        symbol: unitFormData.symbol ? unitFormData.symbol : false,
      });
      if (close) close();
      return;
    }

    await createUnit({
      ...unitFormData,
      symbol: unitFormData.symbol ? unitFormData.symbol : false,
    });
    reset();

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={wrap({ gap: '1rem' })}>
      <UnderlineInput
        labelText='Singulier'
        ref={inputRef}
        name='singular'
        type='text'
        required
        value={unitFormData.singular}
        onChange={handleChange}
        className={css({ flex: '1', minW: '14rem' })}
      />
      <UnderlineInput
        labelText='Pluriel'
        name='plural'
        type='text'
        required
        value={unitFormData.plural}
        onChange={handleChange}
        className={css({ flex: '1', minW: '14rem' })}
      />
      <UnderlineInput
        labelText='Symbole (facultatif)'
        name='symbol'
        type='text'
        value={unitFormData.symbol}
        onChange={handleChange}
        className={css({ flex: '1', minW: '100%' })}
      />

      {unitToEdit ? (
        <ModalActions>
          <Button size='smd'>Modifier l&apos;unité</Button>
          {close && <CancelBtn onClick={close} text='Annuler' />}
        </ModalActions>
      ) : (
        <Button fullWidth={true} mt='1.1rem'>
          Ajouter une unité
        </Button>
      )}
    </form>
  );
};
