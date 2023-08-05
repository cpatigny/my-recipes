import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { css, cx } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';

import { Icon } from '../Icon/Icon';

import './GoBack.scss';

export const GoBack = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClick = () => {
    // if the user clicked on a link on the website
    // if he directly type the url to come to this page
    // the go back arrow will redirect to home page
    if (state?.hasClickedLink) {
      navigate(-1);
      return;
    }

    navigate(ROUTES.HOME);
  };

  return (
    <button
      onClick={handleClick}
      className={cx(
        className,
        flex({
          justify: 'center',
          align: 'center',
        }),
      )}
    >
      <Icon
        name='west'
        className={css({
          color: 'text',
          fontSize: { base: '2.2rem!', xsm: '2.6rem!' },
        })}
      />
    </button>
  );
};
