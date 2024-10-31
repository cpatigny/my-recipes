import { useState } from 'react';
import { logOut } from '../../helpers/auth.helpers';
import { ROUTES } from '../../routes';
import { css, cx } from '../../../styled-system/css';
import { flex, hstack } from '../../../styled-system/patterns';
import { token } from '../../../styled-system/tokens';

import { NavLink } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';
import { Overlay } from '../Overlay';
import { Icon } from '../Icon';
import { Container } from '../Container';

const menuItemStyles = css({
  bg: 'transparent',
  transitionDuration: '200ms',
  fontSize: 'md',
  color: '#454B58',
});

const menuBtnBarStyles = css({
  display: 'block',
  w: '100%',
  h: '3px',
  bg: 'text',
  rounded: 'full',
});

export interface Link {
  id: number;
  path: string;
  name: string;
  iconName: string;
}

export const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const links: Link[] = [
    { id: 0, path: ROUTES.HOME, name: 'Accueil', iconName: 'home' },
    {
      id: 1,
      path: ROUTES.CATEGORIES,
      name: 'Catégories',
      iconName: 'category',
    },
    {
      id: 2,
      path: ROUTES.INGREDIENTS,
      name: 'Ingrédients',
      iconName: 'restaurant_menu',
    },
    { id: 3, path: ROUTES.UNITS, name: 'Unités', iconName: 'straighten' },
  ];

  return (
    <>
      <div className={css({ mb: '5.3125rem' })}></div>
      <header
        className={css({
          pos: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          zIndex: '9',
          bg: '#fcfcfc',
          boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
        })}
      >
        <Container
          className={flex({
            justify: { base: 'flex-end', md: 'space-between' },
            gap: '0 0.6rem',
            py: { base: '0.6rem', md: '1rem' },
          })}
        >
          <nav
            className={hstack({
              gap: '0 1.2rem',
              display: { base: 'none', md: 'flex' },
            })}
          >
            {links.map(link => (
              <NavLink
                key={link.id}
                to={link.path}
                end
                className={cx(
                  menuItemStyles,
                  css({ _hover: { color: 'primary' } }),
                )}
                style={({ isActive }) => {
                  return {
                    color: isActive ? token('colors.primary') : '',
                  };
                }}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <button
            className={cx(
              menuItemStyles,
              hstack({
                gap: '0 0.4rem',
                display: { base: 'none', md: 'flex' },
              }),
            )}
            onClick={() => logOut()}
          >
            <Icon name='logout' />
            Déconnexion
          </button>
          <button
            className={css({
              display: { base: 'block', md: 'none' },
              w: '2.5rem',
              p: '0.8rem 0.4rem',
            })}
            onClick={() => setShowMenu(true)}
          >
            <span className={menuBtnBarStyles}></span>
            <span className={css({ display: 'block', mb: '0.5rem' })} />
            <span className={menuBtnBarStyles}></span>
          </button>
        </Container>
      </header>
      <Overlay isShow={showMenu} close={() => setShowMenu(false)}>
        <MobileMenu
          isShow={showMenu}
          close={() => setShowMenu(false)}
          links={links}
        />
      </Overlay>
    </>
  );
};
