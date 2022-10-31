import logo from '../../assets/img/logo.svg';

import { Link } from 'react-router-dom';

import './Logo.scss';

const Logo = () => (
  <Link to='/' className='top'>
    <p><img src={logo} alt='logo' className='logo' />My recipes</p>
  </Link>
);

export default Logo;
