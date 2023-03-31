import { Link } from 'react-router-dom';

interface RecipeCardProps {
  title: string;
  imageName: string | false;
  slug: string;
}

const RecipeCard = ({ title, imageName, slug }: RecipeCardProps) => {
  const imageUrl = imageName && `https://firebasestorage.googleapis.com/v0/b/my-recipes-5f5d6.appspot.com/o/recipe-images%2F${imageName}?alt=media`;

  return (
    <Link
      to={`/recette/${slug}`}
      className={`recipe ${imageName ? '' : 'no-image'}`}
    >
      { imageUrl && <img className='recipe-image' src={imageUrl} alt={title} /> }
      <div className='gradient' />
      <p className='recipe-title'>{ title }</p>
    </Link>
  );
};

export default RecipeCard;
