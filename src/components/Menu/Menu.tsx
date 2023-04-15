import { useState } from 'react';
import { logOut } from '../../utils/firebase/authMethods';

import { NavLink } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import Overlay from '../Overlay/Overlay';

import './Menu.scss';

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className='margin-b'></div>
      <header className='menu'>
        <div className='container'>
          <nav>
            <NavLink to='/' end>Accueil</NavLink>
            <NavLink to='/categories' end>Catégories</NavLink>
          </nav>
          <button className='sign-out' onClick={() => logOut()}>
            <span className='material-icons-round'>logout</span>
            Déconnexion
          </button>
          <button className='open-menu' onClick={() => setShowMenu(true)}>
            <span className='bar one'></span>
            <span className='bar two'></span>
          </button>
        </div>
      </header>
      <Overlay isShow={showMenu} close={() => setShowMenu(false)}>
        <MobileMenu isShow={showMenu} close={() => setShowMenu(false)} />
      </Overlay>
    </>
  );
};

export default Menu;
