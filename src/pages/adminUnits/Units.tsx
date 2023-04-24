import { Units as UnitsType } from '../../types/unit';

interface UnitsProps {
  units: UnitsType;
}

const Units = ({ units }: UnitsProps) => (
  <ul className='admin-list'>
    {Object.keys(units).map(key => {
      const unit = units[key];
      if (!unit) return null;
      return (
        <li key={key}>
          <div className='unit-details'>
            <p>singulier : <b>{ unit.singular }</b></p>
            <p>pluriel : <b>{ unit.plural }</b></p>
            <p>symbole : <b>{ unit.symbol }</b></p>
          </div>
        </li>
      );
    })}
  </ul>
);

export default Units;
