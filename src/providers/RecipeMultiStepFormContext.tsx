import { createContext, useContext, useEffect, useState } from 'react';
import useMultiStepForm, { Step, useMultiStepFormReturn } from '../hooks/useMultiStepForm';
import { Updater, useImmer } from 'use-immer';
import { RecipeFormData, RecipeWithId } from '../types/recipe';
import generateRecipeKey from '../utils/firebase/generateRecipeKey';

import InformationForm from '../components/RecipeMultiStepForm/InformationForm';
import IngredientsForm from '../components/RecipeMultiStepForm/IngredientsForm';
import PreparationForm from '../components/RecipeMultiStepForm/PreparationForm';
import Preview from '../components/RecipeMultiStepForm/Preview';

export const NORMAL_MODE = 'nb-of-servings';
export const MARKDOWN_MODE = 'markdown';

export type Modes = typeof NORMAL_MODE | typeof MARKDOWN_MODE;
export type FormElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface RecipeMultiStepFormContextValues extends useMultiStepFormReturn {
  recipeFormData: RecipeFormData;
  setRecipeFormData: Updater<RecipeFormData>;
  previewImageSrc: string | null;
  setPreviewImageSrc: React.Dispatch<React.SetStateAction<string | null>>;
  mode: Modes;
  setMode: React.Dispatch<React.SetStateAction<Modes>>;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  recipeId: string;
  handleChange: (e: React.ChangeEvent<FormElements>) => void;
  isEditMode: boolean;
  oldImageName: string | false;
  recipe?: RecipeWithId | null;
}

const RecipeMultiStepFormContext = createContext<RecipeMultiStepFormContextValues | null>(null);

interface ProviderProps {
  recipe?: RecipeWithId | null;
  children: React.ReactNode;
}

export const RecipeMultiStepFormProvider = ({ recipe, children }: ProviderProps) => {
  const DEFAULT_DATA: RecipeFormData = {
    title: '',
    slug: '',
    imageName: false,
    categoryId: false,
    nbServings: '',
    servingsUnit: '',
    groups: null,
    ingredients: {},
    content: '',
    createdAt: false,
  };

  const [recipeFormData, setRecipeFormData] = useImmer<RecipeFormData>(DEFAULT_DATA);
  const [oldImageName, setOldImageName] = useState<string | false>(false);
  const [previewImageSrc, setPreviewImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Modes>(NORMAL_MODE);
  const [recipeId, setRecipeId] = useState<string>(generateRecipeKey());

  const steps: Step[] = [
    {
      element: <InformationForm />,
      title: 'Informations',
      formId: 'informations',
    },
    {
      element: <IngredientsForm />,
      title: 'Ingrédients',
      formId: 'ingredients',
    },
    {
      element: <PreparationForm />,
      title: 'Préparation',
      formId: 'preparation',
    },
    {
      element: <Preview />,
      title: 'Aperçu',
      formId: 'preview',
    },
  ];

  const multiStepFormController = useMultiStepForm(steps);

  useEffect(() => {
    // recipe is loading or we're not in edit mode
    if (!recipe) return;

    const { id, ...recipeWithoutId } = recipe;

    setRecipeId(id);

    setRecipeFormData(draft => {
      return {
        ...draft,
        ...recipeWithoutId,
      };
    });

    setOldImageName(recipe.imageName);
    setMode(typeof recipe.ingredients === 'string' ? MARKDOWN_MODE : NORMAL_MODE);

    if (recipe.imageName) {
      setPreviewImageSrc(`https://firebasestorage.googleapis.com/v0/b/my-recipes-5f5d6.appspot.com/o/recipe-images%2F${recipe.imageName}?alt=media`);
    }
  }, [recipe, setMode, setPreviewImageSrc, setRecipeFormData]);

  const handleChange = (e: React.ChangeEvent<FormElements>) => {
    const { value, name } = e.currentTarget;
    setRecipeFormData({ ...recipeFormData, [name]: value });
  };

  const providerValue = {
    ...multiStepFormController,
    recipeFormData,
    setRecipeFormData,
    previewImageSrc,
    setPreviewImageSrc,
    imageFile,
    setImageFile,
    mode,
    setMode,
    recipeId,
    handleChange,
    isEditMode: !!recipe,
    oldImageName,
    recipe,
  };

  return (
    <RecipeMultiStepFormContext.Provider value={providerValue}>
      { children }
    </RecipeMultiStepFormContext.Provider>
  );
};

export const useRecipeMultiStepForm = () => {
  const context = useContext(RecipeMultiStepFormContext);

  if (!context) {
    throw new Error('useRecipeMultiStepForm must be used within a RecipeMultiStepFormProvider');
  }

  return context;
};

export default RecipeMultiStepFormContext;
