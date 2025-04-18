/* eslint-disable sonarjs/no-hardcoded-passwords */
import { FirebaseError } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { get, getDatabase, ref } from 'firebase/database';
import '../../firebase';
import { signIn } from '../../helpers/auth.helpers';

export const mockedAdminCredentials = {
  email: 'admin@example.com',
  password: 'password',
} as const;

export const signInWithMockedAdmin = async () => {
  try {
    const { email, password } = mockedAdminCredentials;
    await signIn(email, password);
  } catch (error) {
    if (
      error instanceof FirebaseError &&
      error.code === 'auth/user-not-found'
    ) {
      throw new Error(
        'mockedAdminCredentials is invalid, add the user to firebase authentication emulator or update credentials',
      );
    }
  }

  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);

  const snapshot = await get(userRef);
  const userData = snapshot.val();

  // check if mocked user has admin role
  if (userData.role !== 'admin') {
    throw new Error(
      'User is not admin, add the role in database emulator in order for the tests to work',
    );
  }
};
