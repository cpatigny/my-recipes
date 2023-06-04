import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

export const STORAGE_RECIPE_IMAGES_FOLDER = 'recipe-images';
export const STORAGE_BUCKET_NAME = 'my-recipes-5f5d6.appspot.com';
export const STORAGE_EMULATOR_PORT = 9199;
export const DB_EMULATOR_PORT = 9000;
export const AUTH_EMULATOR_PORT = 9099;

const firebaseConfig = {
  apiKey: 'AIzaSyBaDklljNG0fqG3I29pTRY3Uo09O0JhjEY',
  authDomain: 'my-recipes-5f5d6.firebaseapp.com',
  databaseURL: 'https://my-recipes-5f5d6-default-rtdb.firebaseio.com',
  projectId: 'my-recipes-5f5d6',
  storageBucket: STORAGE_BUCKET_NAME,
  messagingSenderId: '1092479917736',
  appId: '1:1092479917736:web:69edb37ca30fb5fab3ac9d',
};

const firebase = initializeApp(firebaseConfig);

if (window.location.hostname === 'localhost') {
  const db = getDatabase();
  connectDatabaseEmulator(db, 'localhost', DB_EMULATOR_PORT);

  const auth = getAuth();
  connectAuthEmulator(auth, `http://localhost:${AUTH_EMULATOR_PORT}`);

  const storage = getStorage();
  connectStorageEmulator(storage, 'localhost', STORAGE_EMULATOR_PORT);
}

export { firebase };
