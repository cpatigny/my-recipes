import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RecipeCardProps {
  title: string;
  imageName: string | false;
  slug: string;
}

const RecipeCard = ({ title, imageName, slug }: RecipeCardProps) => {
  const navigate = useNavigate();

  const backgroundImageGradient = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.7))';
  const backgroundImageUrl = imageName && `https://firebasestorage.googleapis.com/v0/b/my-recipes-5f5d6.appspot.com/o/recipe-images%2F${imageName}?alt=media`;

  const backgroundImage = imageName ? `${backgroundImageGradient}, url(${backgroundImageUrl})` : backgroundImageGradient;

  const openRecipe = () => navigate(`/recette/${slug}`);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') openRecipe();
  };

  return (
    <div
      onClick={openRecipe}
      onKeyDown={handleKeyDown}
      className={`recipe ${imageName ? '' : 'no-image'}`}
      style={{ backgroundImage }}
      role='link'
      tabIndex={0}
    >
      <h3 className='recipe-title'>{ title }</h3>
    </div>
  );
};

export default RecipeCard;
