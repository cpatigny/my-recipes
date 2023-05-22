import { User } from 'firebase/auth';
import { logOut } from '../../helpers/auth.helpers';
import { ROUTES } from '../../routes';

import { Link } from 'react-router-dom';

interface FooterProps {
  user: User | null;
}

export const Footer = ({ user }: FooterProps) => (
  <footer>
    <p>Made by <span className='name'>Clément</span></p>
    <div className='admin'>
      { user
        ? <button className='sign-out' onClick={() => logOut()}>Déconnexion</button>
        : <Link to={ROUTES.ADMIN}>Admin</Link>
      }
    </div>
  </footer>
);
