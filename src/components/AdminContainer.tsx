import { ROUTES } from '../routes';
import { useUser } from '../contexts/UserContext';

import { Navigate } from 'react-router-dom';
import { Menu } from './Menu/Menu';
import { Container } from './Container';

interface AdminContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const AdminContainer = ({
  className,
  children,
}: AdminContainerProps) => {
  const { user, userLoading } = useUser();

  if (!user && !userLoading) return <Navigate to={ROUTES.HOME} />;

  return (
    <Container type='admin' className={className || ''}>
      <Menu />
      {children}
    </Container>
  );
};
