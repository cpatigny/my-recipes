import { useState } from 'react';
import { useCategories } from '../../../contexts/CategoriesContext';
import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';
import { DEFAULT_RECIPE_CATEGORY } from '../../../constants';
import { slugify } from '../../../utils/utils';
import { css } from '../../../../styled-system/css';

const inputStyles = css({
  bg: 'white',
  rounded: 'lg',
  p: '0.5rem 0.625rem',
  border: '1px solid #e9e9e9',
  outline: 'none',
  _focus: {
    borderColor: 'primary',
  },
});

const marginTop = '1.4rem';

export interface FormErrors {
  [name: string]: string;
}

export const InformationForm = () => {
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
    <form id={step.formId} onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Titre</label>
        <input
          name='title'
          type='text'
          required
          value={title}
          onChange={handleTitleChange}
          className={inputStyles}
        />
      </div>

      <div data-error={!!formErrors.slug} className={css({ mt: marginTop })}>
        <label htmlFor='slug'>Slug</label>
        <input
          type='text'
          name='slug'
          required
          value={slug}
          onChange={handleChange}
          className={inputStyles}
        />
        {formErrors.slug && <span>{ formErrors.slug }</span>}
      </div>

      <div className={css({ mt: '1.56rem' })}>
        <label htmlFor='image'>Sélectionner une image pour la recette</label>
        <input type='file' name='image' onChange={handleImageChange} />
      </div>

      { previewImageSrc && imageName &&
        <div className={css({ maxW: '25rem' })}>
          <img
            src={previewImageSrc}
            alt={imageName}
            className={css({ w: '100%' })}
          />
        </div>
      }

      <div className={css({ mt: marginTop })}>
        <label htmlFor='category'>Choisissez une catégorie</label>
        <select
          name='category'
          required
          value={categoryId || DEFAULT_RECIPE_CATEGORY.value}
          onChange={handleCategoryChange}
          className={css({
            border: '1px solid #e9e9e9',
            p: '0.5rem 0.625rem',
            bg: 'white',
            rounded: 'lg',
            maxW: '100%',
          })}
        >
          <option value={DEFAULT_RECIPE_CATEGORY.value}>{ DEFAULT_RECIPE_CATEGORY.name }</option>
          {categories && Object.keys(categories).map(key => {
            const categoryObj = categories[key];
            return categoryObj ? (
              <option key={key} value={key}>{categoryObj.name}</option>
            ) : null;
          })}
        </select>
      </div>

      <div className={css({ mt: marginTop })}>
        <label htmlFor='cookTime'>Temps de cuisson (en minutes)</label>
        <input
          name='cookTime'
          type='number'
          value={cookTimeInMins || 0}
          onChange={handleCookTimeChange}
          className={inputStyles}
        />
      </div>
    </form>
  );
};
