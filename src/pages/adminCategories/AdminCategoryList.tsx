import { Categories, CategoryWithId } from '../../types/category';

import { AdminCategory } from './AdminCategory';

interface AdminCategoryListProps {
  categories: Categories | null;
  setCategoryToEdit: React.Dispatch<React.SetStateAction<CategoryWithId | null>>;
}

export const AdminCategoryList = ({ categories, setCategoryToEdit }: AdminCategoryListProps) => {
  if (!categories) return null;

  return (
    <ul className='admin-list'>
      {categories && Object.keys(categories).map(key => {
        const category = categories[key];
        if (!category) return null;
        return (
          <AdminCategory
            key={key}
            category={{ id: key, ...category }}
            setCategoryToEdit={setCategoryToEdit}
          />
        );
      })}
    </ul>
  );
};
