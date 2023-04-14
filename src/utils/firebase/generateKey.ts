import { getDatabase, ref, push } from 'firebase/database';

const generateKey = (path: string) => {
  const db = getDatabase();
  const dbRef = ref(db, path);

  const generatedKey = push(dbRef).key;

  if (!generatedKey) {
    throw new Error(`Invalid ref path : ${path}`);
  }

  return generatedKey;
};

export default generateKey;
