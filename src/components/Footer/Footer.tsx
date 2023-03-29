import { User } from 'firebase/auth';
import { logOut } from '../../utils/firebase/authMethods';

import { Link } from 'react-router-dom';

interface FooterProps {
  user: User | null;
}

const Footer = ({ user }: FooterProps) => (
  <footer>
    <p>Made by <span className='name'>Clément</span></p>
    <div className='admin'>
      { user
        ? <button className='sign-out' onClick={() => logOut()}>Déconnexion</button>
        : <Link to='/admin'>Admin</Link>
      }
      { user && <Link to='/categories'>Catégories</Link> }
    </div>
  </footer>
);

export default Footer;