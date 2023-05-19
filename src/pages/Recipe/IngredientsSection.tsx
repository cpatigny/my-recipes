import { getGroupsWithTheirIngredients } from '../../helpers/group.helpers';
import { getIngredientsWithoutGroup } from '../../helpers/ingredient.helpers';
import { GroupWithIngredients, RecipeWithId } from '../../types/recipe';
import { useState } from 'react';
import { getServingRatio } from '../../helpers/recipe.helpers';

import GroupList from './GroupList';
import IngredientList from './IngredientList';
import Servings from './Servings';

const IngredientsSection = ({ recipe }: { recipe: RecipeWithId }) => {
  const [numberOfServings, setNumberOfServings] = useState(0);

  const { ingredients, groups } = recipe;

  const ingredientsWithoutGroup = getIngredientsWithoutGroup(ingredients);
  let groupsWithIngredients: GroupWithIngredients[] | null = null;

  if (typeof groups === 'object') {
    groupsWithIngredients = getGroupsWithTheirIngredients(groups, ingredients);
  }

  const servingRatio = getServingRatio(numberOfServings, recipe.nbServings);

  return (
    <section className='ingredients'>
      <h2>Ingrédients</h2>
      <Servings
        numberOfServings={numberOfServings}
        setNumberOfServings={setNumberOfServings}
        recipe={recipe}
      />
      <IngredientList ingredients={ingredientsWithoutGroup} servingRatio={servingRatio} />
      {groupsWithIngredients && (
        <GroupList groups={groupsWithIngredients} servingRatio={servingRatio} />
      )}
    </section>
  );
};

export default IngredientsSection;
