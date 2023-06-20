import { useState } from 'react';
import { useUnits } from '../../contexts/UnitsContext';
import { UnitWithId } from '../../types/unit';
import { useRecipes } from '../../contexts/RecipesContext';
import { deleteUnit } from '../../helpers/units.helpers';
import { reverseObject } from '../../utils/utils';

import { AdminContainer } from '../../components/AdminContainer/AdminContainer';
import { UnitForm } from './UnitForm';
import { Units } from './Units';
import { Modal } from '../../components/Modal/Modal';
import { Block } from '../../components/Block/Block';

import './AdminUnits.scss';

export const AdminUnits = () => {
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

      <Block className='form-container'>
        <h2>Créer une unité</h2>
        <UnitForm />
      </Block>

      <Block>
        <h2 className='list-title'>Unités ({ units ? Object.keys(units).length : 0 })</h2>
        {units && (
          <Units
            units={reverseObject(units)}
            setUnitToEdit={setUnitToEdit}
            handleDelete={handleDelete}
          />
        )}
      </Block>

      <Modal isShow={unitToEdit !== null} onClose={closeEditForm} title='Modifier unité'>
        <UnitForm unitToEdit={unitToEdit} close={closeEditForm} />
      </Modal>
    </AdminContainer>
  );
};
