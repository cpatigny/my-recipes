import {
  useContext, useEffect, useRef, useState,
} from 'react';
import slugify from '../../utils/string/slugify';
import { useNavigate } from 'react-router-dom';
import uploadImageAndDeleteOldOne from '../../utils/storage/uploadImageAndDeleteOldOne';
import { RecipeFormData, RecipeWithId } from '../../types/recipe';
import { UploadResult } from 'firebase/storage';
import { CategoriesContext } from '../../providers/CategoriesProvider';
import { updateRecipe, createRecipe } from '../../utils/firebase/recipeMethods';

import './RecipeForm.scss';

interface RecipeFormProps {
  recipe?: RecipeWithId | null;
}

const RecipeForm = ({ recipe }: RecipeFormProps) => {
  const DEFAULT_DATA: RecipeFormData = {
    title: '',
    slug: '',
    imageName: false,
    category: 'none',
    ingredients: '',
    content: '',
    createdAt: false,
  };

  const [recipeFormData, setRecipeFormData] = useState<RecipeFormData>(DEFAULT_DATA);
  const [previewImageSrc, setPreviewImageSrc] = useState<string | null>(null);
  const [oldImageName, setOldImageName] = useState<string | false>(false);

  const { categories } = useContext(CategoriesContext);

  useEffect(() => {
    // recipe is loading or we're not in edit mode
    if (!recipe) return;

    setRecipeFormData({
      title: recipe.title,
      slug: recipe.slug,
      imageName: recipe.imageName,
      category: recipe.category,
      ingredients: recipe.ingredients,
      content: recipe.content,
      createdAt: recipe.createdAt ? recipe.createdAt : false,
    });

    setOldImageName(recipe.imageName);

    if (recipe.imageName) {
      setPreviewImageSrc(`https://firebasestorage.googleapis.com/v0/b/my-recipes-5f5d6.appspot.com/o/recipe-images%2F${recipe.imageName}?alt=media`);
    }
  }, [recipe]);

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  type FormElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

  const handleChange = (e: React.FormEvent<FormElements>) => {
    const { value, name } = e.currentTarget;
    setRecipeFormData({ ...recipeFormData, [name]: value });
  };

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setRecipeFormData({
      ...recipeFormData,
      title: value,
      slug: slugify(value),
    });
  };

  const handleImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;

    if (files && files[0]) {
      setPreviewImageSrc(URL.createObjectURL(files[0]));
      setRecipeFormData({ ...recipeFormData, imageName: files[0].name });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const files = fileInputRef.current?.files;

    // if an image has been uploaded
    if (files && files[0]) {
      const file = files[0];
      const onImageDelete = () => setRecipeFormData({ ...recipeFormData, imageName: false });
      const onImageUpload = (snapshot: UploadResult) => {
        setRecipeFormData({ ...recipeFormData, imageName: snapshot.metadata.name });
      };
      uploadImageAndDeleteOldOne(file, oldImageName, onImageDelete, onImageUpload);
    }

    if (recipeFormData.slug !== slugify(recipeFormData.slug)) {
      alert('Slug invalide');
      return;
    }

    const redirect = () => navigate(`/recette/${recipeFormData.slug}`);

    if (recipe) {
      updateRecipe({ recipe, recipeFormData }).then(redirect);
    } else {
      recipeFormData.createdAt = Date.now();
      createRecipe(recipeFormData).then(redirect);
    }
  };

  return (
    <div className='recipe-form'>
      <form id='add-recipe' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Titre</label>
          <input
            id='title'
            name='title'
            type='text'
            required
            placeholder='Ma super recette'
            value={recipeFormData.title}
            onChange={handleTitleChange} />
        </div>

        <div>
          <label htmlFor='slug'>Slug</label>
          <input type='text' name='slug' id='slug' required value={recipeFormData.slug} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor='image'>Sélectionner une image pour la recette</label>
          <input type='file' name='image' id='image' ref={fileInputRef} onChange={handleImageChange} />
        </div>

        { previewImageSrc && recipeFormData.imageName &&
          <div className='image-preview'>
            <img
              src={previewImageSrc}
              alt={recipeFormData.imageName} />
          </div>
        }

        <div>
          <label htmlFor='category'>Choisissez une catégorie</label>
          <select name='category' id='category' required value={recipeFormData.category} onChange={handleChange}>
            <option value='none'>Aucune</option>
            {categories && Object.keys(categories).map(key => {
              const category = categories[key];
              return category ? (
                <option key={key} value={key}>{category.name}</option>
              ) : null;
            })}
          </select>
        </div>

        <div>
          <label htmlFor='ingredients'>Ingrédients</label>
          <textarea name='ingredients' id='ingredients' required value={recipeFormData.ingredients} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor='content'>Préparation</label>
          <textarea name='content' id='content' required value={recipeFormData.content} onChange={handleChange} />
        </div>
        <button>{ recipe ? 'Modifier' : 'Créer' }</button>
      </form>
    </div>
  );
};

export default RecipeForm;
