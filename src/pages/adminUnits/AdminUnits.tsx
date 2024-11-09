import { useState } from 'react';
import { css } from '../../../styled-system/css';
import { useRecipes } from '../../contexts/RecipesContext';
import { useUnits } from '../../contexts/UnitsContext';
import { deleteUnit } from '../../helpers/units.helpers';
import { blockTitle } from '../../recipes/blockTitle';
import { UnitWithId } from '../../types/unit';
import { reverseObject } from '../../utils/utils';

import { AdminContainer } from '../../components/AdminContainer';
import { Block } from '../../components/Block';
import { MyDialog } from '../../components/Modal/MyDialog';
import { MyModal } from '../../components/Modal/MyModal';
import { MyModalHeading } from '../../components/Modal/MyModalHeading';
import { MyMotionModalOverlay } from '../../components/Modal/MyMotionModalOverlay';
import { UnitForm } from './UnitForm';
import { Units } from './Units';

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
    <AdminContainer>
      <h1 className={css({ fontSize: 'pageTitle' })}>Unités</h1>

      <Block>
        <h2 className={blockTitle()}>Créer une unité</h2>
        <UnitForm />
      </Block>

      <Block>
        <h2 className={blockTitle()}>
          Unités ({units ? Object.keys(units).length : 0})
        </h2>
        {units && (
          <Units
            units={reverseObject(units)}
            setUnitToEdit={setUnitToEdit}
            handleDelete={handleDelete}
          />
        )}
      </Block>

      <MyMotionModalOverlay
        isOpen={unitToEdit !== null}
        onOpenChange={isOpen => {
          if (!isOpen) closeEditForm();
        }}
      >
        <MyModal>
          <MyDialog>
            {({ close }) => (
              <>
                <MyModalHeading>Modifier unité</MyModalHeading>
                <UnitForm
                  unitToEdit={unitToEdit}
                  close={() => {
                    closeEditForm();
                    close();
                  }}
                />
              </>
            )}
          </MyDialog>
        </MyModal>
      </MyMotionModalOverlay>

      {/* <Modal
        isShow={unitToEdit !== null}
        onClose={closeEditForm}
        title='Modifier unité'
      >
        <UnitForm unitToEdit={unitToEdit} close={closeEditForm} />
      </Modal> */}
    </AdminContainer>
  );
};
