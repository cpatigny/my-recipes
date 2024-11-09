import { css } from '../../../styled-system/css';
import { flex, hstack } from '../../../styled-system/patterns';
import { logOut } from '../../helpers/auth.helpers';
import { Link } from './Menu';

import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Icon } from '../Icon';

const topBottomPadding = '0.4rem';
const leftRightPadding = '2.8rem';

interface MobileMenuProps {
  isShow: boolean;
  close: () => void;
  links: Link[];
}

export const MobileMenu = ({ isShow, close, links }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isShow && (
        <motion.aside
          initial={{ transform: 'translateX(100%)' }}
          animate={{ transform: 'translateX(0%)' }}
          exit={{ transform: 'translateX(100%)' }}
          transition={{ duration: 0.2 }}
          className={flex({
            direction: 'column',
            pos: 'fixed',
            right: '0',
            top: '0',
            bottom: '0',
            p: `1rem ${leftRightPadding}`,
            bg: 'bg',
          })}
        >
          <div
            className={flex({
              justify: 'space-between',
              align: 'center',
              mb: '1.4rem',
            })}
          >
            <p
              className={css({
                m: '0',
                fontWeight: '600',
                borderBottomWidth: '1px',
                borderBottomColor: 'orange.200',
              })}
            >
              Menu
            </p>
            <button
              className={flex({
                justify: 'center',
                align: 'center',
                color: 'text',
                pr: '0',
              })}
              onClick={close}
            >
              <Icon name='close' />
            </button>
          </div>
          <nav className={flex({ direction: 'column' })}>
            {links.map(link => (
              <NavLink
                key={link.id}
                to={link.path}
                end
                className={flex({
                  align: 'center',
                  color: 'text',
                  p: `${topBottomPadding} ${leftRightPadding}`,
                  fontSize: 'text',
                  mb: '0.3rem',
                  ml: `-${leftRightPadding}`,
                  mr: `-${leftRightPadding}`,
                })}
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive
                      ? 'rgba(0, 0, 0, 0.05)'
                      : 'transparent',
                  };
                }}
              >
                <Icon
                  name={link.iconName}
                  className={css({ mr: '1.1rem', opacity: '0.9' })}
                />
                {link.name}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={() => logOut()}
            className={hstack({
              gap: '0 0.4rem',
              mt: 'auto',
              color: 'danger',
            })}
          >
            <Icon name='logout' />
            Déconnexion
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
