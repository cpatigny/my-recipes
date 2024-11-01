import { useNavigate } from 'react-router-dom';
import { css } from '../../../styled-system/css';
import { useRecipeMultiStepForm } from '../../contexts/RecipeMultiStepFormContext';
import { useToast } from '../../contexts/ToastContext';
import {
  deleteRecipeImage,
  uploadRecipeImage,
} from '../../helpers/firebase.helpers';
import { createRecipe, updateRecipe } from '../../helpers/recipe.helpers';
import { getRecipePath } from '../../routes';
import { RecipeFormData } from '../../types/recipe';

import { MultiStepFormActions } from '../MultiStepFormActions';
import { InformationForm } from './InformationForm/InformationForm';
import { IngredientsForm } from './IngredientsForm/IngredientsForm';
import { PreparationForm } from './PreparationForm/PreparationForm';
import { Preview } from './Preview/Preview';
import { ProgressBar } from './ProgressBar';

export interface FormErrors {
  [name: string]: string;
}

export const RecipeMultiStepForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    step,
    recipeFormData,
    setRecipeFormData,
    imageFile,
    oldImageName,
    recipe,
    currentStepIndex,
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
      setRecipeFormData({
        ...recipeFormData,
        imageName: snapshot.metadata.name,
      });
    }

    const redirect = () => navigate(getRecipePath(recipeFormData.slug));

    if (recipe) {
      await updateRecipe(recipe, recipeFormData);
      redirect();
      return;
    }

    const newRecipe: RecipeFormData = {
      ...recipeFormData,
      createdAt: Date.now(),
    };
    await createRecipe(newRecipe);
    redirect();
  };

  return (
    <div>
      <ProgressBar />

      <h2 className={css({ fontSize: 'pageTitle', m: '2rem 0 1rem' })}>
        {step.title}
      </h2>

      <>
        {currentStepIndex === 0 && <InformationForm />}
        {currentStepIndex === 1 && <IngredientsForm />}
        {currentStepIndex === 2 && <PreparationForm />}
        {currentStepIndex === 3 && <Preview />}
      </>

      <MultiStepFormActions submitForm={submitRecipe} />
    </div>
  );
};
