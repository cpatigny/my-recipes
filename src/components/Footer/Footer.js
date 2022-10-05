import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signOut as userSignOut } from '../../features/user/userSlice';

import { Link } from 'react-router-dom';

const Footer = ({ user }) => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => dispatch(userSignOut()))
      .catch(error => console.error(error));
  };

  return (
    <footer>
      <p>Made by <span className='name'>Clément</span></p>
      <div className='admin'>
        { user
          ? <button className='sign-out' onClick={handleSignOut}>Déconnexion</button>
          : <Link to='/admin'>Admin</Link>
        }
        { user && <Link to='/categories'>Catégories</Link> }
      </div>
    </footer>
  );
};

export default Footer;
