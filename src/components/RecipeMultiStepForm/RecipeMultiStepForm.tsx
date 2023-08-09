import { useRecipeMultiStepForm } from '../../contexts/RecipeMultiStepFormContext';
import { getRecipePath } from '../../routes';
import { useNavigate } from 'react-router-dom';
import { RecipeFormData } from '../../types/recipe';
import { deleteRecipeImage, uploadRecipeImage } from '../../helpers/firebase.helpers';
import { updateRecipe, createRecipe } from '../../helpers/recipe.helpers';
import { useToast } from '../../contexts/ToastContext';
import { css } from '../../../styled-system/css';

import { MultiStepFormActions } from '../MultiStepFormActions';
import { ProgressBar } from './ProgressBar';

export interface FormErrors {
  [name: string]: string;
}

export const RecipeMultiStepForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    step, recipeFormData, setRecipeFormData, imageFile, oldImageName, recipe,
  } = useRecipeMultiStepForm();

  const submitRecipe = async () => {
    // user deleted the image and didn't add a new one
    if (oldImageName && !recipeFormData.imageName) {
      // delete the old image
      await deleteRecipeImage(oldImageName);
    }

    if (imageFile) {
      // if file size is more than 1mb
      if (imageFile.size > 1 * 1024 * 1024) {
        toast.error(`L'image ne doit pas dépasser 1mo`);
        return;
      }

      // if an image has been uploaded and the recipe already has one
      if (oldImageName) {
        await deleteRecipeImage(oldImageName);
        setRecipeFormData({ ...recipeFormData, imageName: false });
      }

      const snapshot = await uploadRecipeImage(imageFile);
      setRecipeFormData({ ...recipeFormData, imageName: snapshot.metadata.name });
    }

    const redirect = () => navigate(getRecipePath(recipeFormData.slug));

    if (recipe) {
      await updateRecipe(recipe, recipeFormData);
      redirect();
      return;
    }

    const newRecipe: RecipeFormData = { ...recipeFormData, createdAt: Date.now() };
    await createRecipe(newRecipe);
    redirect();
  };

  return (
    <div>
      <ProgressBar />

      <h2 className={css({ fontSize: 'pageTitle', m: '2rem 0 1rem' })}>{ step.title }</h2>

      { step.element }

      <MultiStepFormActions submitForm={submitRecipe} />
    </div>
  );
};
