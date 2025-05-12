import { css } from '../../../styled-system/css';
import { getGroupsWithTheirIngredients } from '../../helpers/group.helpers';
import { getIngredientsWithoutGroup } from '../../helpers/ingredient.helpers';
import { getServingRatio } from '../../helpers/recipe.helpers';
import { GroupWithIngredients, RecipeWithId } from '../../types/recipe';

import { GroupList } from './GroupList';
import { IngredientList } from './IngredientList';
import { Servings } from './Servings';

interface IngredientsSectionProps {
  recipe: RecipeWithId;
  numberOfServings: number;
  setNumberOfServings: React.Dispatch<React.SetStateAction<number>>;
  isOverlay?: boolean;
  className?: string;
}

export const IngredientsSection = ({
  recipe,
  numberOfServings,
  setNumberOfServings,
  isOverlay,
  className,
}: IngredientsSectionProps) => {
  const { ingredients, groups } = recipe;

  const ingredientsWithoutGroup = getIngredientsWithoutGroup(ingredients);
  let groupsWithIngredients: GroupWithIngredients[] | null = null;

  if (typeof groups === 'object') {
    groupsWithIngredients = getGroupsWithTheirIngredients(groups, ingredients);
  }

  const servingRatio = getServingRatio(numberOfServings, recipe.nbServings);

  return (
    <section className={className}>
      {!isOverlay && (
        <>
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
        </>
      )}
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
