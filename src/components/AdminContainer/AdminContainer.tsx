import { ROUTES } from '../../routes';
import { useUser } from '../../contexts/UserContext';

import { Navigate } from 'react-router-dom';
import { Menu } from '../Menu/Menu';

import './AdminContainer.scss';

interface AdminContainerProps {
  className: string;
  children: React.ReactNode;
}

export const AdminContainer = ({ className, children }: AdminContainerProps) => {
  const { user, userLoading } = useUser();

  if (!user && !userLoading) return <Navigate to={ROUTES.HOME} />;

  return (
    <div className={`container admin-container ${className}`}>
      <Menu />
      { children }
    </div>
  );
};
