import AdminContainer from '../../components/AdminContainer/AdminContainer';
import { useUnits } from '../../providers/UnitsProvider';

import UnitForm from './UnitForm';
import Units from './Units';

const AdminUnits = () => {
  const { units } = useUnits();

  return (
    <AdminContainer className='admin-units'>
      <h1>Unités</h1>

      {units && (
        <Units units={units} />
      )}

      <h2>Créer une unité</h2>
      <UnitForm />
    </AdminContainer>
  );
};

export default AdminUnits;
