import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getGroupsWithTheirIngredients } from '../../helpers/group.helpers';
import { getIngredientsWithoutGroup } from '../../helpers/ingredient.helpers';
import { RecipeIngredientWithId, GroupWithIngredients, RecipeWithId } from '../../types/recipe';
import { useState } from 'react';
import { getServingRatio } from '../../helpers/recipe.helpers';

import GroupList from './GroupList';
import IngredientList from './IngredientList';
import Servings from './Servings';

interface CustomListItemProps {
  ordered: boolean;
}

// we need to extract "ordered" to avoid passing it in ...props
// because it throws an error because ordered should be non-boolean but it receives boolean
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomListItem = ({ ordered, ...props }: CustomListItemProps) => (
  <li>
    <label className='checkbox-container'>
      <input type='checkbox' />
      <span className='checkmark' { ...props } />
    </label>
  </li>
);

const components: Components = {
  h1: 'h3',
  h2: 'h4',
  h3: 'h5',
  li: ({ ...props }) => <CustomListItem { ...props } />,
};

const IngredientsSection = ({ recipe }: { recipe: RecipeWithId }) => {
  const [numberOfServings, setNumberOfServings] = useState(0);

  const { ingredients, groups } = recipe;

  let ingredientsWithoutGroup: RecipeIngredientWithId[] | null = null;
  let groupsWithIngredients: GroupWithIngredients[] | null = null;

  if (typeof ingredients === 'object') {
    ingredientsWithoutGroup = getIngredientsWithoutGroup(ingredients);
  }

  if (typeof ingredients === 'object' && typeof groups === 'object') {
    groupsWithIngredients = getGroupsWithTheirIngredients(groups, ingredients);
  }

  const servingRatio = getServingRatio(numberOfServings, recipe.nbServings);

  return (
    <section className='ingredients'>
      <h2>Ingrédients</h2>
      {typeof ingredients === 'object' && (
        <Servings
          numberOfServings={numberOfServings}
          setNumberOfServings={setNumberOfServings}
          recipe={recipe}
        />
      )}
      {typeof ingredients === 'string' && (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          { ingredients }
        </ReactMarkdown>
      )}
      {ingredientsWithoutGroup && (
        <IngredientList ingredients={ingredientsWithoutGroup} servingRatio={servingRatio} />
      )}
      {groupsWithIngredients && (
        <GroupList groups={groupsWithIngredients} servingRatio={servingRatio} />
      )}
    </section>
  );
};

export default IngredientsSection;
