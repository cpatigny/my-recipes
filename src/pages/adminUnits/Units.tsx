import { Units as IUnits, UnitWithId } from '../../types/unit';

import { Icon } from '../../components/Icon';
import { AdminList } from '../../components/AdminList/AdminList';
import { AdminListItem } from '../../components/AdminList/AdminListItem';
import { AdminActions } from '../../components/AdminActions';
import { Button } from '../../components/Button';

interface UnitsProps {
  units: IUnits;
  setUnitToEdit: React.Dispatch<React.SetStateAction<UnitWithId | null>>;
  handleDelete: (unit: UnitWithId) => void;
}

export const Units = ({ units, setUnitToEdit, handleDelete }: UnitsProps) => (
  <AdminList>
    {Object.keys(units).map(key => {
      const unit = units[key];
      if (!unit) return null;
      return (
        <AdminListItem key={key}>
          <div>
            <p>singulier : <b>{ unit.singular }</b></p>
            <p>pluriel : <b>{ unit.plural }</b></p>
            {unit.symbol && (
              <p>symbole : <b>{ unit.symbol }</b></p>
            )}
          </div>
          <AdminActions>
            <Button
              visual='transparent'
              color='edit'
              size='md'
              circle={true}
              onClick={() => setUnitToEdit({ id: key, ...unit })}
            >
              <Icon name='edit' fontSize='1.4rem' />
            </Button>
            <Button
              visual='transparent'
              color='danger'
              size='md'
              circle={true}
              onClick={() => handleDelete({ id: key, ...unit })}
            >
              <Icon name='delete_outline' fontSize='1.4rem' />
            </Button>
          </AdminActions>
        </AdminListItem>
      );
    })}
  </AdminList>
);
