import { useCategories } from '../../providers/CategoriesProvider';
import { FormElements } from './RecipeMultiStepForm';

interface InformationFormProps {
  title: string;
  slug: string;
  imageName: string | false;
  category: string;
  previewImageSrc: string | null;
  handleChange: (e: React.ChangeEvent<FormElements>) => void;
}

const InformationForm = ({
  title, slug, category, imageName, previewImageSrc, handleChange,
}: InformationFormProps) => {
  const { categories } = useCategories();

  return (
    <div className='form-container informations-form'>
      <h2>Informations</h2>
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

      <div>
        <label htmlFor='slug'>Slug</label>
        <input type='text' name='slug' id='slug' required value={slug} onChange={handleChange} />
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
    </div>
  );
};

export default InformationForm;
