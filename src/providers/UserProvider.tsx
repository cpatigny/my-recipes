import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { createContext, useEffect, useState } from 'react';
import { UserData } from '../types/user';

interface UserContextValues {
  user: User | null;
  userData: UserData | null;
  userLoading: boolean;
}

export const UserContext = createContext<UserContextValues>({
  user: null,
  userData: null,
  userLoading: true,
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  const fetchUserData = async (signedInUser: User) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${signedInUser.uid}`);
    const snapshot = await get(userRef);
    setUserData(snapshot.val());
    setUserLoading(false);
  };

  useEffect(() => {
    const auth = getAuth();

    return onAuthStateChanged(auth, signedInUser => {
      if (signedInUser) {
        setUser(signedInUser);
        fetchUserData(signedInUser);
      } else {
        setUser(null);
        setUserLoading(false);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, userData, userLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
