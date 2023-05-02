import { ROUTES } from '../../routes';

import notFoundSvg from '../../assets/img/undraw-page-not-found.svg';

import './NotFound.scss';

const NotFound = () => (
  <div className='container not-found'>
    <img className='not-found-img' src={notFoundSvg} alt='404 Not Found illustration' />
    <p className='not-found-text'>La page recherchée n&apos;existe pas</p>
    <a href={ROUTES.HOME} className='go-home'>Page d&apos;accueil</a>
  </div>
);

export default NotFound;
