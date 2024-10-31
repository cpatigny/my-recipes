import { getGroupsWithTheirIngredients } from '../../helpers/group.helpers';
import { getIngredientsWithoutGroup } from '../../helpers/ingredient.helpers';
import { GroupWithIngredients, RecipeWithId } from '../../types/recipe';
import { getServingRatio } from '../../helpers/recipe.helpers';
import { css } from '../../../styled-system/css';

import { GroupList } from './GroupList';
import { IngredientList } from './IngredientList';
import { Servings } from './Servings';

interface IngredientsSectionProps {
  recipe: RecipeWithId;
  numberOfServings: number;
  setNumberOfServings: React.Dispatch<React.SetStateAction<number>>;
}

export const IngredientsSection = ({
  recipe,
  numberOfServings,
  setNumberOfServings,
}: IngredientsSectionProps) => {
  const { ingredients, groups } = recipe;

  const ingredientsWithoutGroup = getIngredientsWithoutGroup(ingredients);
  let groupsWithIngredients: GroupWithIngredients[] | null = null;

  if (typeof groups === 'object') {
    groupsWithIngredients = getGroupsWithTheirIngredients(groups, ingredients);
  }

  const servingRatio = getServingRatio(numberOfServings, recipe.nbServings);

  return (
    <section className={css({ mt: '2.2rem' })}>
      <h2
        className={css({
          fontSize: 'clamp(2rem, 1.6295rem + 1.8526vw, 2.44rem)',
        })}
      >
        Ingrédients
      </h2>
      <Servings
        numberOfServings={numberOfServings}
        setNumberOfServings={setNumberOfServings}
        recipe={recipe}
      />
      <IngredientList
        ingredients={ingredientsWithoutGroup}
        servingRatio={servingRatio}
      />
      {groupsWithIngredients && (
        <GroupList groups={groupsWithIngredients} servingRatio={servingRatio} />
      )}
    </section>
  );
};
