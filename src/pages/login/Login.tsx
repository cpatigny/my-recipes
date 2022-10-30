import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import './Login.scss';

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.user);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginFormData;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/', { replace: true });
      })
      .catch(error => {
        console.error(`Error ${error.code} : ${error.message}`);
        alert('Email ou mot de passe incorrect');
      });
  };

  // if user is already login, we check if null because null is type object
  if (typeof user === 'object' && user !== null) return <Navigate to='/' replace />;

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
