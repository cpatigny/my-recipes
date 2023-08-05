import { ROUTES } from '../../routes';
import { vstack } from '../../../styled-system/patterns';
import { css } from '../../../styled-system/css';
import { button } from '../../recipes/button';

import { Container } from '../../components/Container';
import { Link } from 'react-router-dom';

import notFoundSvg from '../../assets/img/undraw-page-not-found.svg';

import './NotFound.scss';

export const NotFound = () => (
  <Container className={vstack({ p: '3.6rem 1rem' })}>
    <img
      className={css({ w: 'calc(100% - 25vw)', maxW: '31.25rem' })}
      src={notFoundSvg}
      alt='404 Not Found illustration'
    />
    <p
      className={css({
        fontSize: 'clamp(1.25rem, calc(-0.0643rem + 5.2571vw), 2.4rem)',
        my: '2rem',
      })}
    >
      La page recherchée n&apos;existe pas
    </p>
    <Link
      to={ROUTES.HOME}
      className={button({ size: 'md' })}
    >
        Page d&apos;accueil
    </Link>
  </Container>
);
