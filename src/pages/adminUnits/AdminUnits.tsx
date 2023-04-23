import AdminContainer from '../../components/AdminContainer/AdminContainer';
import UnitForm from './UnitForm';

const AdminUnits = () => {
  return (
    <AdminContainer className='admin-units'>
      <h1>Unités</h1>

      <UnitForm />
    </AdminContainer>
  );
};

export default AdminUnits;
