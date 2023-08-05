import { Categories, CategoryWithId } from '../../types/category';

import { AdminCategory } from './AdminCategory';
import { AdminList } from '../../components/AdminList/AdminList';

interface AdminCategoryListProps {
  categories: Categories | null;
  setCategoryToEdit: React.Dispatch<React.SetStateAction<CategoryWithId | null>>;
}

export const AdminCategoryList = ({ categories, setCategoryToEdit }: AdminCategoryListProps) => {
  if (!categories) return null;

  return (
    <AdminList>
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
    </AdminList>
  );
};
