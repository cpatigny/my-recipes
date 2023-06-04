import { getDatabase, push, ref } from 'firebase/database';
import { ref as storageRef, getStorage, deleteObject, uploadBytes } from 'firebase/storage';
import { STORAGE_BUCKET_NAME, STORAGE_EMULATOR_PORT, STORAGE_RECIPE_IMAGES_FOLDER } from '../firebase';

export const deleteRecipeImage = (imageName: string) => {
  const storage = getStorage();
  const imageRef = storageRef(storage, `${STORAGE_RECIPE_IMAGES_FOLDER}/${imageName}`);
  return deleteObject(imageRef);
};

export const uploadRecipeImage = (file: File) => {
  const storage = getStorage();
  const imageRef = storageRef(storage, `${STORAGE_RECIPE_IMAGES_FOLDER}/${file.name}`);
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

export const getRecipeImgUrl = (imageName: string) => {
  let storageUrl = '';

  if (window.location.hostname === 'localhost') {
    storageUrl = `http://localhost:${STORAGE_EMULATOR_PORT}/v0/b/${STORAGE_BUCKET_NAME}/o`;
  } else {
    storageUrl = `https://firebasestorage.googleapis.com/v0/b/${STORAGE_BUCKET_NAME}/o`;
  }

  const imgPath = STORAGE_RECIPE_IMAGES_FOLDER ? `${STORAGE_RECIPE_IMAGES_FOLDER}%2F${imageName}` : imageName;
  return `${storageUrl}/${imgPath}?alt=media`;
};
