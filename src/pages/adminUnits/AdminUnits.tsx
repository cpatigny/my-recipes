import { useState } from 'react';
import { useUnits } from '../../contexts/UnitsContext';
import { UnitWithId } from '../../types/unit';
import { useRecipes } from '../../contexts/RecipesContext';
import { deleteUnit } from '../../helpers/units.helpers';

import AdminContainer from '../../components/AdminContainer/AdminContainer';
import UnitForm from './UnitForm';
import Units from './Units';
import Modal from '../../components/Modal/Modal';

const AdminUnits = () => {
  const [unitToEdit, setUnitToEdit] = useState<UnitWithId | null>(null);

  const { units } = useUnits();
  const { recipes } = useRecipes();

  const closeEditForm = () => setUnitToEdit(null);

  const handleDelete = (unit: UnitWithId) => {
    if (!window.confirm(`Supprimer "${unit.singular}" ?`)) {
      return;
    }

    if (recipes) deleteUnit(unit.id, recipes);
  };

  return (
    <AdminContainer className='admin-units'>
      <h1>Unités</h1>

      {units && (
        <Units units={units} setUnitToEdit={setUnitToEdit} handleDelete={handleDelete} />
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
