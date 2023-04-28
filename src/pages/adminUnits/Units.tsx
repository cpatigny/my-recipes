import { Units as IUnits, UnitWithId } from '../../types/unit';

import Icon from '../../components/Icon/Icon';

interface UnitsProps {
  units: IUnits;
  setUnitToEdit: React.Dispatch<React.SetStateAction<UnitWithId | null>>;
  handleDelete: (unit: UnitWithId) => void;
}

const Units = ({ units, setUnitToEdit, handleDelete }: UnitsProps) => (
  <ul className='admin-list'>
    {Object.keys(units).map(key => {
      const unit = units[key];
      if (!unit) return null;
      return (
        <li key={key}>
          <div className='unit-details'>
            <p>singulier : <b>{ unit.singular }</b></p>
            <p>pluriel : <b>{ unit.plural }</b></p>
            {unit.symbol && (
              <p>symbole : <b>{ unit.symbol }</b></p>
            )}
          </div>
          <div className='actions delete-edit'>
            <button className='edit' onClick={() => setUnitToEdit({ id: key, ...unit })}>
              <Icon name='edit' />
            </button>
            <button className='delete' onClick={() => handleDelete({ id: key, ...unit })}>
              <Icon name='delete_outline' />
            </button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default Units;
