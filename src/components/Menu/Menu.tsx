import { useState } from 'react';
import { logOut } from '../../utils/firebase/authMethods';

import { NavLink } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import Overlay from '../Overlay/Overlay';

import './Menu.scss';

export interface Link {
  id: number;
  path: string;
  name: string;
  iconName: string;
}

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const links: Link[] = [
    { id: 0, path: '/', name: 'Accueil', iconName: 'home' },
    { id: 1, path: '/categories', name: 'Catégories', iconName: 'category' },
    { id: 2, path: '/ingredients', name: 'Ingrédients', iconName: 'restaurant_menu' },
  ];

  return (
    <>
      <div className='margin-b'></div>
      <header className='menu'>
        <div className='container'>
          <nav>
            {links.map(link => (
              <NavLink key={link.id} to={link.path} end>{ link.name }</NavLink>
            ))}
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
        <MobileMenu isShow={showMenu} close={() => setShowMenu(false)} links={links} />
      </Overlay>
    </>
  );
};

export default Menu;
