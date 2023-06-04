import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBaDklljNG0fqG3I29pTRY3Uo09O0JhjEY',
  authDomain: 'my-recipes-5f5d6.firebaseapp.com',
  databaseURL: 'https://my-recipes-5f5d6-default-rtdb.firebaseio.com',
  projectId: 'my-recipes-5f5d6',
  storageBucket: 'my-recipes-5f5d6.appspot.com',
  messagingSenderId: '1092479917736',
  appId: '1:1092479917736:web:69edb37ca30fb5fab3ac9d',
};

const firebase = initializeApp(firebaseConfig);

if (window.location.hostname === 'localhost') {
  const db = getDatabase();
  connectDatabaseEmulator(db, 'localhost', 9000);

  const auth = getAuth();
  connectAuthEmulator(auth, 'http://localhost:9099');

  const storage = getStorage();
  connectStorageEmulator(storage, 'localhost', 9199);
}

export { firebase };
