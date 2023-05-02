import { getDatabase, push, ref } from 'firebase/database';
import { ref as storageRef, getStorage, deleteObject, uploadBytes } from 'firebase/storage';
import { RECIPE_IMAGES_FOLDER_NAME } from '../constants';

export const deleteRecipeImage = (imageName: string) => {
  const storage = getStorage();
  const imageRef = storageRef(storage, `${RECIPE_IMAGES_FOLDER_NAME}/${imageName}`);
  return deleteObject(imageRef);
};

export const uploadRecipeImage = (file: File) => {
  const storage = getStorage();
  const imageRef = storageRef(storage, `${RECIPE_IMAGES_FOLDER_NAME}/${file.name}`);
  return uploadBytes(imageRef, file);
};

export const generateKey = (path: string) => {
  const db = getDatabase();
  const dbRef = ref(db, path);

  const generatedKey = push(dbRef).key;

  if (!generatedKey) {
    throw new Error(`Invalid ref path : ${path}`);
  }

  return generatedKey;
};
