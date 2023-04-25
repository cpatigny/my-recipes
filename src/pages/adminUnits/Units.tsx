import { Units as IUnits, UnitWithId } from '../../types/unit';

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
              <span className='material-icons-round'>edit</span>
            </button>
            <button className='delete' onClick={() => handleDelete({ id: key, ...unit })}>
              <span className='material-icons-round'>delete_outline</span>
            </button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default Units;
