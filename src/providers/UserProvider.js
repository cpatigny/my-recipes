import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import Manager from '../utils/firebase/Manager';

export const UserContext = createContext({
  user: 'loading',
  userData: 'loading',
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState('loading');
  const [userData, setUserData] = useState('loading');

  useEffect(() => {
    const auth = getAuth();

    return onAuthStateChanged(auth, signedInUser => {
      setUser(signedInUser); // null if no user signed in
    });
  }, []);

  useEffect(() => {
    // if the user isn't sign in
    if (!user) {
      setUserData(false);
      return;
    }

    // cancel if the user is loading
    if (user === 'loading' || userData !== 'loading') return;

    const userManager = new Manager(`users/${user.uid}`);
    userManager.getAllOnce(snapshot => setUserData(snapshot.val()), error => console.error(error));
  }, [user, userData]);

  return (
    <UserContext.Provider value={{ user, userData, setUser }}>
      { children }
    </UserContext.Provider>
  );
};

export default UserProvider;
