interface CategoryProps {
  id: string;
  name: string;
  selected: boolean;
  selectCategory: (id: string) => void;
}

const Category = ({ id, name, selected, selectCategory }: CategoryProps) => (
  <button className={`category ${selected ? 'selected' : ''}`} onClick={() => selectCategory(id)}>
    { name }
  </button>
);

export default Category;
