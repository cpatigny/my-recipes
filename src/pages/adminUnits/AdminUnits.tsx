import { useState } from 'react';
import { useUnits } from '../../providers/UnitsProvider';
import { UnitWithId } from '../../types/unit';

import AdminContainer from '../../components/AdminContainer/AdminContainer';
import UnitForm from './UnitForm';
import Units from './Units';
import Modal from '../../components/Modal/Modal';

const AdminUnits = () => {
  const [unitToEdit, setUnitToEdit] = useState<UnitWithId | null>(null);

  const { units } = useUnits();

  const closeEditForm = () => setUnitToEdit(null);

  return (
    <AdminContainer className='admin-units'>
      <h1>Unités</h1>

      {units && (
        <Units units={units} setUnitToEdit={setUnitToEdit} />
      )}

      <h2>Créer une unité</h2>
      <UnitForm />

      <Modal isShow={unitToEdit !== null} close={closeEditForm} title='Modifier unité'>
        <UnitForm unitToEdit={unitToEdit} close={closeEditForm} />
      </Modal>
    </AdminContainer>
  );
};

export default AdminUnits;
