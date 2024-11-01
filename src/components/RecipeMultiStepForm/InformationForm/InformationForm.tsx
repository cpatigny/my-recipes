import { useRef, useState } from 'react';
import { css, cx } from '../../../../styled-system/css';
import { DEFAULT_RECIPE_CATEGORY } from '../../../constants';
import { useCategories } from '../../../contexts/CategoriesContext';
import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';
import { slugify } from '../../../utils/utils';

import { Button } from '../../Button';
import { Icon } from '../../Icon';

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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    const newCategoryId =
      value === DEFAULT_RECIPE_CATEGORY.value ? false : value;
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

  const removeImage = () => {
    setImageFile(null);
    setRecipeFormData({ ...recipeFormData, imageName: false });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form id={step.formId} onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Titre</label>
        <input
          id='title'
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
          id='slug'
          type='text'
          name='slug'
          required
          value={slug}
          onChange={handleChange}
          className={inputStyles}
        />
        {formErrors.slug && <span>{formErrors.slug}</span>}
      </div>

      <div className={css({ mt: '1.56rem' })}>
        <label htmlFor='image'>Sélectionner une image pour la recette</label>
        <input
          id='image'
          type='file'
          ref={fileInputRef}
          name='image'
          onChange={handleImageChange}
          className={cx(
            inputStyles,
            css({
              '&::file-selector-button': {
                bg: '#f0f0f0',
                mr: '0.6rem',
                p: '0.2rem 1rem',
                rounded: 'sm',
                cursor: 'pointer',

                _hover: {
                  bg: '#e3e3e3',
                },
              },
            }),
          )}
        />
      </div>

      {previewImageSrc && imageName && (
        <div
          className={css({
            maxW: '25rem',
            pos: 'relative',
          })}
        >
          <Button
            type='button'
            visual='semiTransparent'
            color='blackAndWhite'
            circle={true}
            className={css({
              pos: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
            })}
            onClick={removeImage}
          >
            <Icon name='close' />
          </Button>
          <img
            src={previewImageSrc}
            alt={imageName}
            className={css({ w: '100%' })}
          />
        </div>
      )}

      <div className={css({ mt: marginTop })}>
        <label htmlFor='category'>Choisissez une catégorie</label>
        <select
          id='category'
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
          <option value={DEFAULT_RECIPE_CATEGORY.value}>
            {DEFAULT_RECIPE_CATEGORY.name}
          </option>
          {categories &&
            Object.keys(categories).map(key => {
              const categoryObj = categories[key];
              return categoryObj ? (
                <option key={key} value={key}>
                  {categoryObj.name}
                </option>
              ) : null;
            })}
        </select>
      </div>

      <div className={css({ mt: marginTop })}>
        <label htmlFor='cookTime'>Temps de cuisson (en minutes)</label>
        <input
          id='cookTime'
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
