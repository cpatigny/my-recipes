import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { css } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';
import { useToast } from '../../contexts/ToastContext';
import { useUser } from '../../contexts/UserContext';
import { signIn } from '../../helpers/auth.helpers';
import { ROUTES } from '../../routes';

import { Button } from '../../components/Button';
import { Container } from '../../components/Container';

const inputStyles = css({
  p: '0.5rem 0.625rem',
  rounded: 'lg',
  mb: '1.125rem',
  WebkitAppearance: 'none', // so that box-shadow works on input on ios
  shadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  w: '100%',
});

const labelStyles = css({
  m: '0.75rem 0 0.2rem',
});

export const Login = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { user } = useUser();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginFormData;

    try {
      await signIn(email, password);
      navigate(ROUTES.HOME, { replace: true });
    } catch (error) {
      toast.error('Email ou mot de passe incorrect');
      console.error(error);
    }
  };

  // if user is already login, we check if null because null is type object
  if (typeof user === 'object' && user !== null) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <Container
      type='admin'
      className={flex({
        pos: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        overflowX: 'hidden',
        overflowY: 'auto',
        zIndex: '10',
        align: 'center',
        justify: 'center',
        p: '1.25',
      })}
    >
      <div
        className={css({
          rounded: '2xl',
          maxW: '23.75rem',
          w: '100%',
          p: '1.125rem 1.6rem',
          shadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
          bg: '#fefefe',
        })}
      >
        <h1 className={css({ fontSize: '2.4rem', mb: '1rem' })}>Login</h1>

        <div>
          <form onSubmit={handleSignIn}>
            <div>
              <label htmlFor='email' className={labelStyles}>
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                required
                value={loginFormData.email}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>
            <div>
              <label htmlFor='password' className={labelStyles}>
                Mot de passe
              </label>
              <input
                id='password'
                name='password'
                type='password'
                required
                value={loginFormData.password}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>
            <Button fullWidth={true} mt='0.5rem' rounded='lg'>
              Se connecter
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
};
