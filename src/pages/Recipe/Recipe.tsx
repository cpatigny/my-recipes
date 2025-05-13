import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { css, cx } from '../../../styled-system/css';
import { center, flex, vstack } from '../../../styled-system/patterns';
import { useCategories } from '../../contexts/CategoriesContext';
import { useShoppingList } from '../../contexts/ShoppingListContext';
import { getCookTimeText } from '../../helpers/recipe.helpers';
import { useRecipeBySlug } from '../../hooks/useRecipeBySlug';
import { useScrollRestoration } from '../../hooks/useScrollRestoration';
import { button } from '../../recipes/button';
import { ROUTES } from '../../routes';
import { ShoppingListItem } from '../../types/shoppingList';
import { formatDate } from '../../utils/utils';

import { motion } from 'framer-motion';
import { token } from '../../../styled-system/tokens';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { GoBack } from '../../components/GoBack';
import { Icon } from '../../components/Icon';
import { Loading } from '../../components/Loading';
import { Overlay } from '../../components/Overlay';
import { RecipeSteps } from '../../components/RecipeSteps';
import { Category } from '../home/Category';
import { IngredientsSection } from './IngredientsSection';
import { RecipeActions } from './RecipeActions';
import { RecipeImage } from './RecipeImage';

export const Recipe = () => {
  const [numberOfServings, setNumberOfServings] = useState(0);
  const [showIngredients, setShowIngredients] = useState(false);

  const { categories } = useCategories();
  const { restoreScroll } = useScrollRestoration();
  const { recipe, noMatch } = useRecipeBySlug();
  const {
    addToShoppingListAndNotify,
    shoppingListContainsRecipe,
    deleteFromShoppingListAndNotify,
  } = useShoppingList();

  useEffect(() => {
    if (!('wakeLock' in navigator)) return;

    let wakeLock: WakeLockSentinel | null = null;

    const requestWakeLock = async () => {
      try {
        wakeLock = await navigator.wakeLock.request('screen');
      } catch (error) {
        // the wake lock request fails - usually system related, such being low on battery
        console.log(`Wake lock request failed: ${error}`);
      }
    };

    const handleVisibilityChange = () => {
      if (wakeLock !== null && document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };

    requestWakeLock();

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

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

  useEffect(() => {
    // to avoid overflow being hidden when clicking on a recipe in shopping list on home page
    document.body.style.overflow = 'auto';
  }, []);

  if (noMatch) return <Navigate to={ROUTES.NOT_FOUND} replace />;
  if (!recipe || !categories) return <Loading />;

  const recipeCategory = recipe.categoryId && categories[recipe.categoryId];
  const { cookTimeInMins } = recipe;
  const isRecipeInShoppingList = shoppingListContainsRecipe(recipe.id);
  const item: ShoppingListItem = {
    id: recipe.id,
    servingsNb: numberOfServings,
  };

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
            {recipe.title}
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
          <span>
            Ajouté le <b>{formatDate(recipe.createdAt)}</b>
          </span>
        </div>

        <RecipeActions recipe={recipe} />
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
        <p className={css({ mt: '1.5rem' })}>
          Temps de cuisson : <b>{getCookTimeText(cookTimeInMins)}</b>
        </p>
      )}

      <IngredientsSection
        recipe={recipe}
        numberOfServings={numberOfServings}
        setNumberOfServings={setNumberOfServings}
        className={css({ mt: '2.2rem' })}
      />

      <section className={css({ pb: '3rem' })}>
        <h2
          className={css({
            fontSize: 'clamp(2rem, 1.6295rem + 1.8526vw, 2.44rem)',
          })}
        >
          Préparation
        </h2>
        <RecipeSteps steps={recipe.steps} />
      </section>
      <Overlay
        isShow={showIngredients}
        close={() => setShowIngredients(false)}
        className={css({ bg: 'rgba(0, 0, 0, 0.2)' })}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={css({
            pos: 'fixed',
            top: '1rem',
            bottom: '1rem',
            left: '1rem',
            right: '1rem',
            zIndex: '9999',
            rounded: 'xl',
            transformOrigin: 'bottom right',
            overflow: 'hidden',
            md: {
              top: 'auto',
              left: 'auto',
              bottom: 'fixedButton',
              right: 'fixedButton',
              shadow: '2xl',
              h: '45rem',
              w: '35rem',
              maxH: 'var(--max-size)',
              maxW: 'var(--max-size)',
            },
          })}
          style={
            {
              // 100% - bottom value * 2 to also have a space at the top the same size of the bottom one
              '--max-size': `calc(100% - ${token('spacing.fixedButton')} * 2)`,
            } as React.CSSProperties
          }
        >
          <div
            className={css({
              pos: 'relative',
              bg: 'primary',
              p: '0.3rem 1rem',
              roundedTopLeft: 'xl',
              roundedTopRight: 'xl',
            })}
          >
            <h2
              className={css({
                fontSize: '1.2rem',
                fontWeight: '600',
                color: 'white',
                textAlign: 'center',
              })}
            >
              Liste des ingrédients
            </h2>
            <button
              onClick={() => setShowIngredients(false)}
              className={center({
                pos: 'absolute',
                top: '50%',
                right: '0.4rem',
                transform: 'translateY(-50%)',
                padding: '0.3rem',
                color: 'white',
                transitionDuration: '200ms',
                _hover: { color: 'rgba(255, 255, 255, 0.6)' },
              })}
            >
              <Icon name='close' fontSize='1.4rem' />
            </button>
          </div>
          <div
            className={css({
              bg: 'bg',
              h: '100%',
              overflow: 'auto',
              roundedBottomLeft: 'xl',
              roundedBottomRight: 'xl',
            })}
          >
            <IngredientsSection
              recipe={recipe}
              numberOfServings={numberOfServings}
              setNumberOfServings={setNumberOfServings}
              className={css({
                p: '1rem 1.56rem 2rem',
              })}
              isOverlay
            />
          </div>
        </motion.div>
      </Overlay>
      <Button
        className={css({
          pos: 'fixed',
          bottom: 'fixedButton',
          right: 'fixedButton',
          p: '0.8rem',
          zIndex: '999',
        })}
        onClick={() => setShowIngredients(true)}
      >
        <Icon name='format_list_bulleted' />
      </Button>
    </Container>
  );
};
