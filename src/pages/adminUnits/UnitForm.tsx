import { useState } from 'react';
import { createUnit } from '../../utils/firebase/unitMethods';

interface UnitFormData {
  singular: string;
  plural: string;
  symbol: string;
}

const UnitForm = () => {
  const DEFAULT_DATA: UnitFormData = {
    singular: '',
    plural: '',
    symbol: '',
  };

  const [unitFormData, setUnitFormData] = useState(DEFAULT_DATA);

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
    await createUnit(unitFormData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='singular'>Unité (au <b>singulier</b>)</label>
        <input
          id='singular'
          name='singular'
          type='text'
          required
          value={unitFormData.singular}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='plural'>Unité (au <b>pluriel</b>)</label>
        <input
          id='plural'
          name='plural'
          type='text'
          required
          value={unitFormData.plural}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='symbol'>Symbole (facultatif)</label>
        <input
          id='symbol'
          name='symbol'
          type='text'
          value={unitFormData.symbol}
          onChange={handleChange}
        />
      </div>
      <button>Ajouter une unité</button>
    </form>
  );
};

export default UnitForm;
