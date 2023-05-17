import { useState } from 'react';
import { useCategories } from '../../../contexts/CategoriesContext';
import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';
import { DEFAULT_RECIPE_CATEGORY } from '../../../constants';
import { slugify } from '../../../utils';

export interface FormErrors {
  [name: string]: string;
}

const InformationForm = () => {
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const { categories } = useCategories();
  const {
    step,
    recipeFormData,
    previewImageSrc,
    handleChange,
    next,
    setImageFile,
    setPreviewImageSrc,
    setRecipeFormData,
  } = useRecipeMultiStepForm();
  const { title, slug, categoryId, imageName, cookTimeInMins } = recipeFormData;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    const file = files && files[0];

    if (file) {
      setImageFile(file);
      setPreviewImageSrc(URL.createObjectURL(file));
      setRecipeFormData({ ...recipeFormData, imageName: file.name });
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setRecipeFormData(draft => {
      draft.title = value;
      draft.slug = slugify(value);
    });
  };

  const handleCookTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const nb = Number(value);

    setRecipeFormData(draft => {
      draft.cookTimeInMins = nb > 0 ? nb : false;
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    const newCategoryId = value === DEFAULT_RECIPE_CATEGORY.value ? false : value;
    setRecipeFormData({ ...recipeFormData, categoryId: newCategoryId });
  };

  const validateInformation = (slugToValidate: string) => {
    const errors: FormErrors = {};

    if (slugToValidate !== slugify(slugToValidate)) {
      errors.slug = 'Slug invalide';
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateInformation(recipeFormData.slug);

    if (Object.keys(errors).length > 0) {
      setFormErrors({
        ...formErrors,
        ...errors,
      });
      return;
    }

    setFormErrors({});
    next();
  };

  return (
    <form id={step.formId} className='form-container informations-form' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Titre</label>
        <input
          id='title'
          name='title'
          type='text'
          required
          placeholder='Ma super recette'
          value={title}
          onChange={handleTitleChange} />
      </div>

      <div className={formErrors.slug ? 'form-error' : ''}>
        <label htmlFor='slug'>Slug</label>
        <input type='text' name='slug' id='slug' required value={slug} onChange={handleChange} />
        {formErrors.slug && <span>{ formErrors.slug }</span>}
      </div>

      <div>
        <label htmlFor='image'>Sélectionner une image pour la recette</label>
        <input type='file' name='image' id='image' onChange={handleImageChange} />
      </div>

      { previewImageSrc && imageName &&
        <div className='image-preview'>
          <img
            src={previewImageSrc}
            alt={imageName} />
        </div>
      }

      <div>
        <label htmlFor='category'>Choisissez une catégorie</label>
        <select name='category' id='category' required value={categoryId || DEFAULT_RECIPE_CATEGORY.value} onChange={handleCategoryChange}>
          <option value={DEFAULT_RECIPE_CATEGORY.value}>{ DEFAULT_RECIPE_CATEGORY.name }</option>
          {categories && Object.keys(categories).map(key => {
            const categoryObj = categories[key];
            return categoryObj ? (
              <option key={key} value={key}>{categoryObj.name}</option>
            ) : null;
          })}
        </select>
      </div>

      <div>
        <label htmlFor='cookTime'>Temps de cuisson (en minutes)</label>
        <input
          id='cookTime'
          name='cookTime'
          type='number'
          value={cookTimeInMins || 0}
          onChange={handleCookTimeChange} />
      </div>
    </form>
  );
};

export default InformationForm;