import { css } from '../../styled-system/css';

export const ErrorMessage = () => (
  <div className={css({ fontSize: '1.5rem' })}>
    <p>
      Une erreur est survenue. Vérifiez votre connexion internet et rechargez la
      page
    </p>
  </div>
);
