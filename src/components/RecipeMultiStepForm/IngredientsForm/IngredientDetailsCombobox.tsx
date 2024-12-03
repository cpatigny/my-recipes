import {
  getIngredientDetailsName,
  getMatchingIngredientsDetails,
} from '../../../helpers/ingredientDetails.helpers';
import {
  IngredientDetailsWithId,
  IngredientsDetails,
} from '../../../types/ingredientDetails';
import { RecipeIngredientFormData } from '../../../types/recipe';

import MyCombobox from '../../Form/MyCombobox';
import MyListBox from '../../Form/MyListBox';
import MyListBoxItem from '../../Form/MyListBoxItem';

interface IngredientDetailsComboboxProps {
  ingredientData: RecipeIngredientFormData;
  setIngredientData: React.Dispatch<
    React.SetStateAction<RecipeIngredientFormData>
  >;
  ingredientsDetails: IngredientsDetails | null;
  ingredientSearch: string;
  setIngredientSearch: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
  className?: string;
}

export const IngredientDetailsCombobox = ({
  ingredientData,
  setIngredientData,
  ingredientsDetails,
  ingredientSearch,
  setIngredientSearch,
  error,
  className,
}: IngredientDetailsComboboxProps) => {
  const matchingIngredients = getMatchingIngredientsDetails(
    ingredientSearch,
    ingredientsDetails,
  );

  return (
    <MyCombobox
      aria-label='Sélectionner un ingrédient'
      items={matchingIngredients}
      onSelectionChange={value => {
        setIngredientData({
          ...ingredientData,
          detailsId: value?.toString() || '',
        });

        setIngredientSearch(
          getIngredientDetailsName(
            ingredientsDetails,
            value ? value.toString() : '',
          ),
        );
      }}
      onInputChange={value => {
        if (value === '') {
          setIngredientData({
            ...ingredientData,
            detailsId: '',
          });
        }
        setIngredientSearch(value);
      }}
      selectedKey={ingredientData.detailsId}
      inputValue={ingredientSearch}
      placeholder='Ingrédient'
      error={error}
      className={className}
    >
      <MyListBox>
        {(ingredient: IngredientDetailsWithId) => (
          <MyListBoxItem
            key={ingredient.id}
            textValue={ingredient.name}
            anOptionIsSelected={!!ingredientData.detailsId}
          >
            {ingredient.name}
          </MyListBoxItem>
        )}
      </MyListBox>
    </MyCombobox>
  );
};
