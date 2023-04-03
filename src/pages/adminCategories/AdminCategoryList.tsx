import { Categories } from '../../types/category';

import AdminCategory from './AdminCategory';

interface AdminCategoryListProps {
  categories: Categories | null;
}

const AdminCategoryList = ({ categories }: AdminCategoryListProps) => {
  if (!categories) return null;

  return (
    <div className='category-list'>
      {categories && Object.keys(categories).map(key => {
        const category = categories[key];
        if (!category) return null;
        return <AdminCategory key={key} category={{ id: key, ...category }} />;
      })}
    </div>
  );
};

export default AdminCategoryList;
