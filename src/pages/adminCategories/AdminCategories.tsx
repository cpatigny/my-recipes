import { useState } from 'react';
import { useCategories } from '../../contexts/CategoriesContext';
import { CategoryWithId } from '../../types/category';

import AdminCategoryList from './AdminCategoryList';
import AdminContainer from '../../components/AdminContainer/AdminContainer';
import CategoryForm from './CategoryForm';
import Block from '../../components/Block/Block';

import './AdminCategories.scss';
import Modal from '../../components/Modal/Modal';

const AdminCategories = () => {
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryWithId | null>(null);

  const { categories } = useCategories();

  const closeModal = () => setCategoryToEdit(null);

  return (
    <AdminContainer className='admin-categories'>
      <h1>Catégories</h1>

      <Block className='form-container'>
        <h2>Ajouter une catégorie</h2>
        <CategoryForm />
      </Block>

      <Block>
        <h2 className='list-title'>Liste des catégories</h2>
        <AdminCategoryList categories={categories} setCategoryToEdit={setCategoryToEdit} />
      </Block>

      <Modal isShow={!!categoryToEdit} title='Modifier catégorie' close={closeModal}>
        {categoryToEdit && (
          <CategoryForm categoryToEdit={categoryToEdit} closeModal={closeModal} />
        )}
      </Modal>
    </AdminContainer>
  );
};

export default AdminCategories;
