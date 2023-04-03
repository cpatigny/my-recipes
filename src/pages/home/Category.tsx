import { CategoryWithId } from '../../types/category';

import { Link } from 'react-router-dom';

interface CategoryProps {
  category: CategoryWithId;
  selected: boolean;
}

const Category = ({ category, selected }: CategoryProps) => (
  <Link to={`/category/${category.slug}`} className={`category ${selected ? 'selected' : ''}`}>
    { category.name }
  </Link>
);

export default Category;
