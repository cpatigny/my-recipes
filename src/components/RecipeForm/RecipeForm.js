import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import slugify from '../../utils/slugify';
import { useNavigate } from 'react-router-dom';
import uploadImageAndDeleteOldOne from '../../utils/storage/uploadImageAndDeleteOldOne';
import { createRecipe, updateRecipe } from '../../features/recipe/recipeSlice';

import './RecipeForm.scss';

const RecipeForm = ({ recipe }) => {
  const DEFAULT_DATA = {
    title: '',
    slug: '',
    imageName: false,
    category: 'none',
    ingredients: '',
    content: '',
  };

  const [recipeFormData, setRecipeFormData] = useState(DEFAULT_DATA);
  const [previewImageSrc, setPreviewImageSrc] = useState(false);
  const [oldImageName, setOldImageName] = useState(false);

  const { categories } = useSelector(state => state.category);

  const dispatch = useDispatch();

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
    });

    setOldImageName(recipe.imageName);

    if (recipe.imageName) {
      setPreviewImageSrc(`https://firebasestorage.googleapis.com/v0/b/my-recipes-5f5d6.appspot.com/o/recipe-images%2F${recipe.imageName}?alt=media`);
    }
  }, [recipe]);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleChange = e => {
    const { value, name } = e.target;
    setRecipeFormData({ ...recipeFormData, [name]: value });
  };

  const handleTitleChange = e => {
    const { value } = e.target;
    setRecipeFormData({
      ...recipeFormData,
      title: value,
      slug: slugify(value),
    });
  };

  const handleImageChange = e => {
    setPreviewImageSrc(URL.createObjectURL(e.target.files[0]));
    setRecipeFormData({ ...recipeFormData, imageName: e.target.files[0].name });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const file = fileInputRef.current.files[0];

    // if an image has been uploaded
    if (file) {
      const onImageDelete = () => setRecipeFormData({ ...recipeFormData, imageName: false });
      const onImageUpload = snapshot => {
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
      dispatch(updateRecipe({ recipe, recipeFormData })).then(redirect);
    } else {
      dispatch(createRecipe(recipeFormData)).then(redirect);
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

        { previewImageSrc &&
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
            {Object.keys(categories).map(key => (
              <option key={key} value={key}>{ categories[key] }</option>
            ))}
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
