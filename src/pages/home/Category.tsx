import { Category as CategoryType } from '../../types/category';
import { getCategoryPath } from '../../routes';

import { Link } from 'react-router-dom';

interface CategoryProps {
  category: CategoryType;
  selected?: boolean;
}

const Category = ({ category, selected }: CategoryProps) => (
  <Link to={getCategoryPath(category.slug)} className={`category ${selected ? 'selected' : ''}`}>
    { category.name }
  </Link>
);

export default Category;
