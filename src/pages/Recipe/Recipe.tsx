import { useEffect, useState } from 'react';
import remarkGfm from 'remark-gfm';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useScrollRestoration } from '../../hooks/useScrollRestoration';
import { useCategories } from '../../contexts/CategoriesContext';
import { ROUTES } from '../../routes';
import { useRecipeBySlug } from '../../hooks/useRecipeBySlug';
import { formatDate } from '../../utils/utils';
import { getCookTimeText } from '../../helpers/recipe.helpers';
import { css, cx } from '../../../styled-system/css';
import { flex, vstack } from '../../../styled-system/patterns';
import { button } from '../../recipes/button';
import { useShoppingList } from '../../contexts/ShoppingListContext';
import { ShoppingListItem } from '../../types/shoppingList';

import { Loading } from '../../components/Loading';
import { RecipeActions } from './RecipeActions';
import ReactMarkdown from 'react-markdown';
import { RecipeImage } from './RecipeImage';
import { GoBack } from '../../components/GoBack';
import { Category } from '../home/Category';
import { IngredientsSection } from './IngredientsSection';
import { Container } from '../../components/Container';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';

export const Recipe = () => {
  const [numberOfServings, setNumberOfServings] = useState(0);

  const { user } = useUser();
  const { categories } = useCategories();
  const { restoreScroll } = useScrollRestoration();
  const { recipe, noMatch } = useRecipeBySlug();
  const {
    addToShoppingListAndNotify,
    shoppingListContainsRecipe,
    deleteFromShoppingListAndNotify,
  } = useShoppingList();

  useEffect(() => {
    if (!recipe) return undefined;
    document.title = recipe.title;

    return () => {
      document.title = 'My Recipes';
    };
  }, [recipe]);

  useEffect(() => {
    restoreScroll();
  }, [restoreScroll]);

  if (noMatch) return <Navigate to={ROUTES.NOT_FOUND} replace />;
  if (!recipe || !categories) return <Loading />;

  const recipeCategory = recipe.categoryId && categories[recipe.categoryId];
  const { cookTimeInMins } = recipe;
  const isRecipeInShoppingList = shoppingListContainsRecipe(recipe.id);
  const item: ShoppingListItem = { id: recipe.id, servingsNb: numberOfServings };

  return (
    <Container>
      <div
        className={css({
          pos: 'relative',
          m: { base: '1rem 0 1.5625rem', md: '1.25rem 0 2.19rem' },
        })}
      >
        <GoBack
          className={css({
            pos: 'absolute',
            top: { base: '0', sm: '0.3rem', md: '0.45rem' },
            left: '0',
          })}
        />
        <div className={vstack({ gap: '0.625rem' })}>
          <h1
            className={css({
              fontSize: 'clamp(1.6rem, 0.4429rem + 4.1143vw, 2.5rem)',
              textAlign: 'center',
              p: { base: '0 3rem', xsm: '0 3.5rem', md: '0 4rem' },
            })}
          >
            { recipe.title }
          </h1>
          {recipeCategory && (
            <Category
              category={recipeCategory}
              className={cx(
                button({
                  color: 'primary',
                  visual: 'outline',
                }),
                css({
                  p: '0.2rem 1.25rem',
                  fontSize: '1rem',
                }),
              )}
            />
          )}
        </div>
      </div>

      <div
        className={flex({
          justify: 'space-between',
          align: 'flex-end',
          mb: '0.625rem',
        })}
      >
        <div>
          <span>Ajouté le <b>{ formatDate(recipe.createdAt) }</b></span>
        </div>

        { user && <RecipeActions recipe={recipe} /> }
      </div>

      <RecipeImage recipe={recipe} />

      {isRecipeInShoppingList ? (
        <Button
          onClick={() => deleteFromShoppingListAndNotify(recipe.id)}
          fullWidth={true}
          className={css({ px: '1rem 1.2rem', mt: '1rem' })}
        >
          <Icon name='remove' className={css({ mr: '0.4rem' })} />
          Retirer de liste de courses
        </Button>
      ) : (
        <Button
          onClick={() => addToShoppingListAndNotify(item)}
          fullWidth={true}
          className={css({ px: '1.2rem', mt: '1rem' })}
        >
          <Icon name='add' className={css({ mr: '0.4rem' })} />
          Ajouter à liste de courses
        </Button>
      )}

      {cookTimeInMins && (
        <p className={css({ m: '1.5rem 0 1.5rem' })}>
          Temps de cuisson : <b>{ getCookTimeText(cookTimeInMins) }</b>
        </p>
      )}

      <IngredientsSection
        recipe={recipe}
        numberOfServings={numberOfServings}
        setNumberOfServings={setNumberOfServings}
      />

      <section>
        <h2 className={css({ fontSize: 'clamp(2rem, 1.6295rem + 1.8526vw, 2.44rem)' })}>
          Préparation
        </h2>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{ h1: 'h3', h2: 'h4', h3: 'h5' }}
          className={css({
            '& h3': {
              fontSize: 'clamp(1.36rem, 1.1916rem + 0.8421vw, 1.56rem)',
              fontWeight: '700',
              m: '2.2rem 0 0.625rem',
            },
            '& p': {
              fontSize: '1.2rem',
              lineHeight: '150%',
              mt: '0.625rem',
            },
          })}
        >
          { recipe.content }
        </ReactMarkdown>
      </section>
    </Container>
  );
};
