import { User } from 'firebase/auth';
import { logOut } from '../../helpers/auth.helpers';
import { ROUTES } from '../../routes';
import { flex } from '../../../styled-system/patterns';
import { css } from '../../../styled-system/css';

import { Link } from 'react-router-dom';

interface FooterProps {
  user: User | null;
}

export const Footer = ({ user }: FooterProps) => (
  <footer
    className={flex({
      align: 'center',
      justify: 'space-between',
      bg: 'orange.450',
      p: { base: '1rem 2rem', xsm: '1.4rem 2.4rem', md: '1.95rem 3.25rem' },
      rounded: '2xl',
      m: { base: '1.5rem 0 0.625rem', xsm: '1.5rem 0 2rem', sm: '3.125rem 0 2rem' },
      fontSize: 'text',
    })}
  >
    <p className={css({ color: 'white' })}>
      Made by <span className='name'>Clément</span>
    </p>
    <div className='admin'>
      { user
        ? <button className={css({ color: 'white' })} onClick={() => logOut()}>Déconnexion</button>
        : <Link to={ROUTES.ADMIN}>Admin</Link>
      }
    </div>
  </footer>
);
