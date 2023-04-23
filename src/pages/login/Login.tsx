import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '../../providers/UserProvider';
import { signIn } from '../../utils/firebase/authMethods';
import { ROUTES } from '../../utils/routes';

import './Login.scss';

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { user } = useUser();

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
      alert('Email ou mot de passe incorrect');
    }
  };

  // if user is already login, we check if null because null is type object
  if (typeof user === 'object' && user !== null) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <div className='container login'>
      <div className='login'>
        <h1>Login</h1>

        <div className='form-container'>
          <form onSubmit={handleSignIn}>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                name='email'
                type='email'
                required
                placeholder='user@example.com'
                value={loginFormData.email}
                onChange={handleChange} />
            </div>
            <div>
              <label htmlFor='password'>Mot de passe</label>
              <input
                id='password'
                name='password'
                type='password'
                required
                placeholder='Mot de passe'
                value={loginFormData.password}
                onChange={handleChange} />
            </div>
            <button className='btn btn-primary'>Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
