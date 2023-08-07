import { useState } from 'react';
import { useCategories } from '../../contexts/CategoriesContext';
import { CategoryWithId } from '../../types/category';
import { blockTitle } from '../../recipes/blockTitle';
import { css } from '../../../styled-system/css';

import { AdminCategoryList } from './AdminCategoryList';
import { AdminContainer } from '../../components/AdminContainer';
import { CategoryForm } from './CategoryForm';
import { Block } from '../../components/Block';
import { Modal } from '../../components/Modal/Modal';

export const AdminCategories = () => {
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryWithId | null>(null);

  const { categories } = useCategories();

  const closeModal = () => setCategoryToEdit(null);

  return (
    <AdminContainer>
      <h1 className={css({ fontSize: 'pageTitle' })}>Catégories</h1>

      <Block className='form-container'>
        <h2 className={blockTitle()}>Ajouter une catégorie</h2>
        <CategoryForm />
      </Block>

      <Block>
        <h2 className={blockTitle()}>Liste des catégories</h2>
        <AdminCategoryList categories={categories} setCategoryToEdit={setCategoryToEdit} />
      </Block>

      <Modal isShow={!!categoryToEdit} title='Modifier catégorie' onClose={closeModal}>
        {categoryToEdit && (
          <CategoryForm categoryToEdit={categoryToEdit} closeModal={closeModal} />
        )}
      </Modal>
    </AdminContainer>
  );
};
