import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const signIn = (email: string, password: string) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
  const auth = getAuth();
  return signOut(auth);
};
