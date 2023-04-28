import { useTransition, animated } from '@react-spring/web';
import { logOut } from '../../utils/firebase/authMethods';
import { Link } from './Menu';

import { NavLink } from 'react-router-dom';
import Icon from '../Icon/Icon';

interface MobileMenuProps {
  isShow: boolean;
  close: () => void;
  links: Link[];
}

const MobileMenu = ({ isShow, close, links }: MobileMenuProps) => {
  const menuTransitions = useTransition(isShow, {
    from: { transform: 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(100%)' },
    config: { tension: 360, friction: 42 },
  });

  return menuTransitions((style, item) => item && (
    <animated.aside style={style} className='mobile-menu'>
      <div className='menu-top'>
        <p>Menu</p>
        <button className='menu-close' onClick={close}>
          <Icon name='close' />
        </button>
      </div>
      <nav>
        {links.map(link => (
          <NavLink key={link.id} to={link.path} end>
            <Icon name={link.iconName} />
            { link.name }
          </NavLink>
        ))}
      </nav>
      <button className='sign-out' onClick={() => logOut()}>
        <Icon name='logout' />
        Déconnexion
      </button>
    </animated.aside>
  ));
};

export default MobileMenu;
