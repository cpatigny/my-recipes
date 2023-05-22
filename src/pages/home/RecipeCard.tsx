import { getRecipePath } from '../../routes';

import { Link } from 'react-router-dom';

interface RecipeCardProps {
  title: string;
  imageName: string | false;
  slug: string;
}

export const RecipeCard = ({ title, imageName, slug }: RecipeCardProps) => {
  const gradient = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.7))';
  const imageUrl = imageName && `https://firebasestorage.googleapis.com/v0/b/my-recipes-5f5d6.appspot.com/o/recipe-images%2F${imageName}?alt=media`;
  const backgroundImage = imageName ? `${gradient}, url(${imageUrl})` : gradient;

  return (
    <Link
      to={getRecipePath(slug)}
      state={{ hasClickedLink: true }}
      className={`recipe ${imageName ? '' : 'no-image'}`}
    >
      <div className='bg-image' style={{ backgroundImage }} />
      <p className='recipe-title'>{ title }</p>
    </Link>
  );
};
