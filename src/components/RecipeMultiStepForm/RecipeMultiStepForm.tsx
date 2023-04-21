import { useEffect, useState } from 'react';
import slugify from '../../utils/string/slugify';
import { useNavigate } from 'react-router-dom';
import uploadImageAndDeleteOldOne from '../../utils/storage/uploadImageAndDeleteOldOne';
import { RecipeFormData, RecipeWithId } from '../../types/recipe';
import { UploadResult } from 'firebase/storage';
import { updateRecipe, createRecipe } from '../../utils/firebase/recipeMethods';
import useMultiStepForm from '../../hooks/useMultiStepForm';

import InformationForm from './InformationForm';
import IngredientsForm from './IngredientsForm';
import PreparationForm from './PreparationForm';
import Preview from './Preview';

import './RecipeForm.scss';
import generateRecipeKey from '../../utils/firebase/generateRecipeKey';
import { getRecipePath } from '../../utils/routes';

interface RecipeFormProps {
  recipe?: RecipeWithId | null;
}

export interface FormErrors {
  [name: string]: string;
}

interface StepErrorsFunction {
  step: number;
  fn: () => FormErrors;
}

export const NORMAL_MODE = 'nb-of-servings';
export const MARKDOWN_MODE = 'markdown';

export type Modes = typeof NORMAL_MODE | typeof MARKDOWN_MODE;
export type FormElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const RecipeMultiStepForm = ({ recipe }: RecipeFormProps) => {
  const DEFAULT_DATA: RecipeFormData = {
    title: '',
    slug: '',
    imageName: false,
    category: 'none',
    nbServings: '',
    servingsUnit: '',
    ingredients: {},
    content: '',
    createdAt: false,
  };

  const [formData, setFormData] = useState<RecipeFormData>(DEFAULT_DATA);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [previewImageSrc, setPreviewImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [oldImageName, setOldImageName] = useState<string | false>(false);
  const [mode, setMode] = useState<Modes>(NORMAL_MODE);
  const [recipeId, setRecipeId] = useState<string>(generateRecipeKey());

  const navigate = useNavigate();

  useEffect(() => {
    // recipe is loading or we're not in edit mode
    if (!recipe) return;

    const { id, ...recipeWithoutId } = recipe;

    setRecipeId(id);

    setFormData(prevFormData => ({
      ...prevFormData,
      ...recipeWithoutId,
      createdAt: recipe.createdAt ? recipe.createdAt : false,
    }));

    setOldImageName(recipe.imageName);
    setMode(typeof recipe.ingredients === 'string' ? MARKDOWN_MODE : NORMAL_MODE);

    if (recipe.imageName) {
      setPreviewImageSrc(`https://firebasestorage.googleapis.com/v0/b/my-recipes-5f5d6.appspot.com/o/recipe-images%2F${recipe.imageName}?alt=media`);
    }
  }, [recipe]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    const file = files && files[0];

    if (file) {
      setImageFile(file);
      setPreviewImageSrc(URL.createObjectURL(file));
      setFormData({ ...formData, imageName: file.name });
    }
  };

  const handleChange = (e: React.ChangeEvent<FormElements>) => {
    const { value, name } = e.currentTarget;

    if (name === 'title') {
      setFormData({
        ...formData,
        title: value,
        slug: slugify(value),
      });
      return;
    }

    if (name === 'image') {
      handleImageChange(e as React.ChangeEvent<HTMLInputElement>);
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const getInformationsErrors = () => {
    const informationsErrors: FormErrors = {};

    if (formData.slug !== slugify(formData.slug)) {
      informationsErrors.slug = 'Slug invalide';
      setFormErrors({
        ...formErrors,
        ...informationsErrors,
      });
    }

    return informationsErrors;
  };

  const submitRecipe = () => {
    // if an image has been uploaded
    if (imageFile) {
      const onImageDelete = () => setFormData({ ...formData, imageName: false });
      const onImageUpload = (snapshot: UploadResult) => {
        setFormData({ ...formData, imageName: snapshot.metadata.name });
      };
      uploadImageAndDeleteOldOne(imageFile, oldImageName, onImageDelete, onImageUpload);
    }

    const redirect = () => navigate(getRecipePath(formData.slug));

    if (recipe) {
      updateRecipe(recipe, formData).then(redirect);
    } else {
      formData.createdAt = Date.now();
      createRecipe(formData).then(redirect);
    }
  };

  // we disable this rule because we won't use the array in an iterable
  /* eslint-disable react/jsx-key */
  const { currentStepIndex, step, isFirstStep, isLastStep, next, back } = useMultiStepForm([
    <InformationForm {...formData} handleChange={handleChange} previewImageSrc={previewImageSrc} />,
    <IngredientsForm
      {...formData}
      handleChange={handleChange}
      mode={mode}
      setMode={setMode}
      setFormData={setFormData}
      recipeId={recipeId}
    />,
    <PreparationForm {...formData} handleChange={handleChange} />,
    <Preview formData={formData} previewImageSrc={previewImageSrc} />,
  ]);
  /* eslint-enable react/jsx-key */

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const stepErrorsFunctions: StepErrorsFunction[] = [
      { step: 0, fn: getInformationsErrors },
    ];

    const errorsFn = stepErrorsFunctions.find(stepFn => stepFn.step === currentStepIndex);
    const errors = errorsFn ? errorsFn.fn() : null;

    if (errors && Object.keys(errors).length > 0) return;

    if (isLastStep) {
      submitRecipe();
      return;
    }

    next();
  };

  return (
    <div className='recipe-form'>
      <form onSubmit={onSubmit}>
        { step }

        <div className='step-actions'>
          { !isFirstStep && <button className='previous btn-outline' type='button' onClick={back}>Précédent</button> }
          { !isLastStep && <button className='btn-primary' type='submit'>Suivant</button> }
          { isLastStep && (
            <button className='btn-primary' type='submit'>
              { recipe ? 'Modifier la recette' : 'Créer la recette' }
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RecipeMultiStepForm;
