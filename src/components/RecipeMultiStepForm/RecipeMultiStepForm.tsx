import { UploadResult } from 'firebase/storage';
import { useRecipeMultiStepForm } from '../../contexts/RecipeMultiStepFormContext';
import { getRecipePath } from '../../routes';
import { useNavigate } from 'react-router-dom';
import { RecipeFormData } from '../../types/recipe';
import { uploadImageAndDeleteOldOne } from '../../helpers/firebase.helpers';
import { updateRecipe, createRecipe } from '../../helpers/recipe.helpers';

import MultiStepFormActions from '../MultiStepFormActions/MultiStepFormActions';

import './RecipeMultiStepForm.scss';

export interface FormErrors {
  [name: string]: string;
}

const RecipeMultiStepForm = () => {
  const navigate = useNavigate();
  const {
    step, recipeFormData, setRecipeFormData, imageFile, oldImageName, recipe,
  } = useRecipeMultiStepForm();

  const submitRecipe = () => {
    // if an image has been uploaded
    if (imageFile) {
      const onImageDelete = () => setRecipeFormData({ ...recipeFormData, imageName: false });
      const onImageUpload = (snapshot: UploadResult) => {
        setRecipeFormData({ ...recipeFormData, imageName: snapshot.metadata.name });
      };
      uploadImageAndDeleteOldOne(imageFile, oldImageName, onImageDelete, onImageUpload);
    }

    const redirect = () => navigate(getRecipePath(recipeFormData.slug));

    if (recipe) {
      updateRecipe(recipe, recipeFormData).then(redirect);
      return;
    }

    const newRecipe: RecipeFormData = { ...recipeFormData, createdAt: Date.now() };
    createRecipe(newRecipe).then(redirect);
  };

  return (
    <div className='recipe-form'>
      <h2>{ step.title }</h2>

      { step.element }

      <MultiStepFormActions submitForm={submitRecipe} />
    </div>
  );
};

export default RecipeMultiStepForm;
