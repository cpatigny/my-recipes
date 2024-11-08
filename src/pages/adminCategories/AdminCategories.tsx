import { useState } from 'react';
import { css } from '../../../styled-system/css';
import { useCategories } from '../../contexts/CategoriesContext';
import { blockTitle } from '../../recipes/blockTitle';
import { CategoryWithId } from '../../types/category';

import { AdminContainer } from '../../components/AdminContainer';
import { Block } from '../../components/Block';
import { MyDialog } from '../../components/Modal/MyDialog';
import { MyModal } from '../../components/Modal/MyModal';
import { MyModalHeading } from '../../components/Modal/MyModalHeading';
import { MyModalOverlay } from '../../components/Modal/MyModalOverlay';
import { AdminCategoryList } from './AdminCategoryList';
import { CategoryForm } from './CategoryForm';

export const AdminCategories = () => {
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryWithId | null>(
    null,
  );

  const { categories } = useCategories();

  const closeModal = () => setCategoryToEdit(null);

  return (
    <AdminContainer>
      <h1 className={css({ fontSize: 'pageTitle' })}>Catégories</h1>

      <Block>
        <h2 className={blockTitle()}>Ajouter une catégorie</h2>
        <CategoryForm />
      </Block>

      <Block>
        <h2 className={blockTitle()}>Liste des catégories</h2>
        <AdminCategoryList
          categories={categories}
          setCategoryToEdit={setCategoryToEdit}
        />
      </Block>

      <MyModalOverlay
        isOpen={!!categoryToEdit}
        onOpenChange={isOpen => {
          if (!isOpen) closeModal();
        }}
      >
        <MyModal>
          <MyDialog>
            {({ close }) => (
              <>
                <MyModalHeading>Modifier catégorie</MyModalHeading>
                {categoryToEdit && (
                  <CategoryForm
                    categoryToEdit={categoryToEdit}
                    closeModal={() => {
                      closeModal();
                      close();
                    }}
                  />
                )}
              </>
            )}
          </MyDialog>
        </MyModal>
      </MyModalOverlay>
    </AdminContainer>
  );
};
