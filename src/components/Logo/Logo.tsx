import logo from '../../assets/img/logo.svg';
import { ROUTES } from '../../utils/routes';

import { Link } from 'react-router-dom';

import './Logo.scss';

const Logo = () => (
  <Link to={ROUTES.HOME} className='top'>
    <p><img src={logo} alt='logo' className='logo' />My recipes</p>
  </Link>
);

export default Logo;
