import { useState, useRef, useEffect } from 'react';
import { createCategory, updateCategory } from '../../helpers/category.helpers';
import { slugify } from '../../utils/utils';
import { CategoryWithId } from '../../types/category';
import { useToast } from '../../contexts/ToastContext';
import { wrap } from '../../../styled-system/patterns';
import { css } from '../../../styled-system/css';

import { UnderlineInput } from '../../components/UnderlineInput/UnderlineInput';
import { CancelBtn } from '../../components/CancelBtn/CancelBtn';
import { Button } from '../../components/Button';

interface CategoryFormProps {
  categoryToEdit?: CategoryWithId;
  closeModal?: () => void;
}

export const CategoryForm = ({ categoryToEdit, closeModal }: CategoryFormProps) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!categoryToEdit) return;

    setName(categoryToEdit.name);
    setSlug(categoryToEdit.slug);
  }, [categoryToEdit]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setName(value);
    setSlug(slugify(value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (categoryToEdit) {
      await updateCategory({
        id: categoryToEdit.id,
        name,
        slug,
      });
      if (closeModal) closeModal();
      return;
    }

    await createCategory({ name, slug });
    toast.success(`La catégorie "${name}" a bien été crée.`);
    setName('');
    setSlug('');

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={wrap({ gap: '1rem' })}>
      <UnderlineInput
        ref={inputRef}
        labelText='Nom'
        name='name'
        type='text'
        required
        value={name}
        onChange={handleNameChange}
        className={css({ flex: '1', minW: '10rem' })}
      />

      <UnderlineInput
        labelText='Slug'
        name='slug'
        type='text'
        required
        value={slug}
        onChange={e => setSlug(slugify(e.currentTarget.value))}
        className={css({ flex: '1', minW: '10rem' })}
      />

      {categoryToEdit ? (
        <div className='modal-actions'>
          <button className='btn-primary modal-button'>Modifier</button>
          {closeModal && <CancelBtn onClick={closeModal} text='Annuler' />}
        </div>
      ) : (
        <Button fullWidth={true} mt='1.1rem'>Ajouter</Button>
      )}
    </form>
  );
};
