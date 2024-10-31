import { Category as CategoryType } from '../../types/category';
import { getCategoryPath } from '../../routes';

import { Link } from 'react-router-dom';

interface CategoryProps {
  category: CategoryType;
  selected?: boolean;
  className: string;
}

export const Category = ({ category, selected, className }: CategoryProps) => (
  <Link
    to={getCategoryPath(category.slug)}
    className={className}
    data-selected={selected}
  >
    {category.name}
  </Link>
);
