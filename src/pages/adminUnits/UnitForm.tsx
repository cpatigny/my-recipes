import { useEffect, useRef, useState } from 'react';
import { UnitWithId } from '../../types/unit';
import { updateUnit, createUnit } from '../../helpers/units.helpers';
import UnderlineInput from '../../components/UnderlineInput/UnderlineInput';

interface UnitFormData {
  singular: string;
  plural: string;
  symbol: string;
}

interface UnitFormProps {
  unitToEdit?: UnitWithId | null;
  close?: () => void;
}

const UnitForm = ({ unitToEdit, close }: UnitFormProps) => {
  const DEFAULT_DATA: UnitFormData = {
    singular: '',
    plural: '',
    symbol: '',
  };

  const [unitFormData, setUnitFormData] = useState(DEFAULT_DATA);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!unitToEdit) return;

    setUnitFormData({ ...unitToEdit, symbol: unitToEdit.symbol ? unitToEdit.symbol : '' });
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
    <form onSubmit={handleSubmit}>
      <UnderlineInput
        labelText='Singulier'
        ref={inputRef}
        name='singular'
        type='text'
        required
        value={unitFormData.singular}
        onChange={handleChange}
      />
      <UnderlineInput
        labelText='Pluriel'
        name='plural'
        type='text'
        required
        value={unitFormData.plural}
        onChange={handleChange}
      />
      <UnderlineInput
        labelText='Symbole (facultatif)'
        name='symbol'
        type='text'
        value={unitFormData.symbol}
        onChange={handleChange}
      />
      <button>
        { unitToEdit ? `Modifier l'unité` : 'Ajouter une unité' }
      </button>
    </form>
  );
};

export default UnitForm;
