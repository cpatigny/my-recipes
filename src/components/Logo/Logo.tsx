import logo from '../../assets/img/logo.svg';
import { ROUTES } from '../../routes';

import { Link } from 'react-router-dom';

import './Logo.scss';

export const Logo = () => (
  <Link to={ROUTES.HOME} className='top'>
    <p><img src={logo} alt='logo' className='logo' />My recipes</p>
  </Link>
);
