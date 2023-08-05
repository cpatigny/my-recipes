import { getGroupsWithTheirIngredients } from '../../helpers/group.helpers';
import { getIngredientsWithoutGroup } from '../../helpers/ingredient.helpers';
import { GroupWithIngredients, RecipeWithId } from '../../types/recipe';
import { useState } from 'react';
import { getServingRatio } from '../../helpers/recipe.helpers';
import { css } from '../../../styled-system/css';

import { GroupList } from './GroupList';
import { IngredientList } from './IngredientList';
import { Servings } from './Servings';

export const IngredientsSection = ({ recipe }: { recipe: RecipeWithId }) => {
  const [numberOfServings, setNumberOfServings] = useState(0);

  const { ingredients, groups } = recipe;

  const ingredientsWithoutGroup = getIngredientsWithoutGroup(ingredients);
  let groupsWithIngredients: GroupWithIngredients[] | null = null;

  if (typeof groups === 'object') {
    groupsWithIngredients = getGroupsWithTheirIngredients(groups, ingredients);
  }

  const servingRatio = getServingRatio(numberOfServings, recipe.nbServings);

  return (
    <section>
      <h2 className={css({ fontSize: 'clamp(2rem, 1.6295rem + 1.8526vw, 2.44rem)' })}>Ingrédients</h2>
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
