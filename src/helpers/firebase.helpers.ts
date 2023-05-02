import { getDatabase, push, ref } from 'firebase/database';
import { ref as storageRef, UploadResult, getStorage, deleteObject, uploadBytes } from 'firebase/storage';

/**
 * This function will delete the existing image and will upload the new one
 * @param {Object} file the image file to upload
 * @param {string} oldImageName the existing image name to delete
 * @param {function} onDelete callback when deleting the existing image
 * @param {function} onUpload callback when uploading the image
 */
export const uploadImageAndDeleteOldOne = (
  file: File,
  oldImageName: string | false,
  onDelete: () => void,
  onUpload: (snapshot: UploadResult) => void,
): void => {
  // if file size is more than 1mo
  if (file.size > 1024000) {
    alert(`L'image ne doit pas dépasser 1mo`);
    return;
  }

  const storage = getStorage();
  const recipeImagesFolderName = 'recipe-images';

  // if an image has already been uploaded
  if (oldImageName) {
    const oldRecipeImageRef = storageRef(storage, `${recipeImagesFolderName}/${oldImageName}`);

    deleteObject(oldRecipeImageRef)
      .then(onDelete);
  }

  const recipeImageRef = storageRef(storage, `${recipeImagesFolderName}/${file.name}`);

  uploadBytes(recipeImageRef, file)
    .then(snapshot => onUpload(snapshot));
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
