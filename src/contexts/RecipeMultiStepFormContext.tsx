import { createContext, useContext, useEffect, useState } from 'react';
import { Updater, useImmer } from 'use-immer';
import { getRecipeImgUrl } from '../helpers/firebase.helpers';
import { generateRecipeKey } from '../helpers/recipe.helpers';
import {
  Step,
  useMultiStepForm,
  UseMultiStepFormReturn,
} from '../hooks/useMultiStepForm';
import { RecipeFormData, RecipeWithId } from '../types/recipe';

export type FormElements =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

interface RecipeMultiStepFormContextValues extends UseMultiStepFormReturn {
  recipeFormData: RecipeFormData;
  setRecipeFormData: Updater<RecipeFormData>;
  previewImageSrc: string | null;
  setPreviewImageSrc: React.Dispatch<React.SetStateAction<string | null>>;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  recipeId: string;
  handleChange: (e: React.ChangeEvent<FormElements>) => void;
  isEditMode: boolean;
  oldImageName: string | false;
  recipe?: RecipeWithId | null;
}

const RecipeMultiStepFormContext =
  createContext<RecipeMultiStepFormContextValues | null>(null);

interface ProviderProps {
  recipe?: RecipeWithId | null;
  children: React.ReactNode;
}

export const RecipeMultiStepFormProvider = ({
  recipe,
  children,
}: ProviderProps) => {
  const DEFAULT_DATA: RecipeFormData = {
    title: '',
    slug: '',
    imageName: false,
    categoryId: false,
    cookTimeInMins: false,
    nbServings: '',
    servingsUnit: '',
    groups: null,
    ingredients: {},
    content: '',
    createdAt: false,
  };

  const [recipeFormData, setRecipeFormData] =
    useImmer<RecipeFormData>(DEFAULT_DATA);
  const [oldImageName, setOldImageName] = useState<string | false>(false);
  const [previewImageSrc, setPreviewImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [recipeId, setRecipeId] = useState<string>(generateRecipeKey());

  const isEditMode = !!recipe;

  const steps: Step[] = [
    {
      title: 'Informations',
      formId: 'informations',
    },
    {
      title: 'Ingrédients',
      formId: 'ingredients',
    },
    {
      title: 'Préparation',
      formId: 'preparation',
    },
    {
      title: 'Aperçu',
      formId: 'preview',
    },
  ];

  const multiStepFormController = useMultiStepForm(steps, isEditMode);

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

    if (recipe.imageName) {
      const imgUrl = getRecipeImgUrl(recipe.imageName);
      setPreviewImageSrc(imgUrl);
    }
  }, [recipe, setPreviewImageSrc, setRecipeFormData]);

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
    recipeId,
    handleChange,
    isEditMode,
    oldImageName,
    recipe,
  };

  return (
    <RecipeMultiStepFormContext.Provider value={providerValue}>
      {children}
    </RecipeMultiStepFormContext.Provider>
  );
};

export const useRecipeMultiStepForm = () => {
  const context = useContext(RecipeMultiStepFormContext);

  if (!context) {
    throw new Error(
      'useRecipeMultiStepForm must be used within a RecipeMultiStepFormProvider',
    );
  }

  return context;
};
