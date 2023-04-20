import { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';

import { Navigate } from 'react-router-dom';
import Menu from '../Menu/Menu';

interface AdminContainerProps {
  className: string;
  children: React.ReactNode;
}

const AdminContainer = ({ className, children }: AdminContainerProps) => {
  const { user, userLoading } = useContext(UserContext);

  if (!user && !userLoading) return <Navigate to='/' />;

  return (
    <div className={`container admin-container ${className}`}>
      <Menu />
      { children }
    </div>
  );
};

export default AdminContainer;