import { useState } from 'react';
import { useCategories } from '../../providers/CategoriesProvider';
import { useRecipeMultiStepForm } from '../../providers/RecipeMultiStepFormContext';
import slugify from '../../utils/string/slugify';

export interface FormErrors {
  [name: string]: string;
}

const InformationForm = () => {
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const { categories } = useCategories();
  const { step, recipeFormData, previewImageSrc, handleChange, next } = useRecipeMultiStepForm();
  const { title, slug, category, imageName } = recipeFormData;

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
          onChange={handleChange} />
      </div>

      <div className={formErrors.slug ? 'form-error' : ''}>
        <label htmlFor='slug'>Slug</label>
        <input type='text' name='slug' id='slug' required value={slug} onChange={handleChange} />
        {formErrors.slug && <span>{ formErrors.slug }</span>}
      </div>

      <div>
        <label htmlFor='image'>Sélectionner une image pour la recette</label>
        <input type='file' name='image' id='image' onChange={handleChange} />
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
        <select name='category' id='category' required value={category} onChange={handleChange}>
          <option value='none'>Aucune</option>
          {categories && Object.keys(categories).map(key => {
            const categoryObj = categories[key];
            return categoryObj ? (
              <option key={key} value={key}>{categoryObj.name}</option>
            ) : null;
          })}
        </select>
      </div>
    </form>
  );
};

export default InformationForm;
