import { useEffect, useRef, useState } from 'react';
import { css } from '../../../styled-system/css';
import { flex, grid, hstack, stack } from '../../../styled-system/patterns';
import { useCategories } from '../../contexts/CategoriesContext';
import { useRecipes } from '../../contexts/RecipesContext';
import { useUser } from '../../contexts/UserContext';
import {
  countRecipesByCategory,
  getCategoryBySlug,
} from '../../helpers/category.helpers';
import {
  getRecipesByCategory,
  reverseRecipes,
  searchMatchingRecipes,
  shuffleRecipes,
} from '../../helpers/recipe.helpers';
import { useScrollRestoration } from '../../hooks/useScrollRestoration';
import { button } from '../../recipes/button';
import { ROUTES } from '../../routes';
import { CategoryWithId } from '../../types/category';
import { PreparationSteps, Recipes } from '../../types/recipe';

import { Link, useParams } from 'react-router-dom';
import { Wrap } from '../../../styled-system/jsx';
import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Menu } from '../../components/Menu/Menu';
import { NothingToShow } from '../../components/NothingToShow';
import { ShoppingList } from '../../components/ShoppingList/ShoppingList';
import { ShoppingListBtn } from '../../components/ShoppingList/ShoppingListBtn';
import { Categories } from './Categories';
import { RecipeCard } from './RecipeCard';
import { SearchBar } from './SearchBar';

import { getDatabase, ref, update } from 'firebase/database';
import logo from '../../assets/img/logo.svg';
import emptyIllustration from '../../assets/img/undraw-empty.svg';
import noResultFoundImg from '../../assets/img/undraw-lost-online.svg';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Overlay } from '../../components/Overlay';
import { generateStepKey } from '../../helpers/step.helpers';
import { RecipeOptionButton } from './RecipeOptionButton';

const nothingToShowStyles = flex({
  direction: 'column',
  align: 'center',
  mt: '3rem',
  gap: '1rem',
  '& img': {
    w: '16.25rem',
    maxW: '100%',
  },
});

const DEFAULT_LIMIT = 20;
export const SAVED_LIMIT_STORAGE_KEY = 'saved-recipe-nb-limit';
const RANDOM_ORDER_KEY = 'random-order';
const ZOOM_OUT_KEY = 'zoom-out';

export const Home = () => {
  const [recipesToShow, setRecipesToShow] = useState<Recipes | null>(null);
  const [search, setSearch] = useState('');
  const [noSearchResult, setNoSearchResult] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryWithId | null>(null);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [limit, setLimit] = useState(() => {
    const savedLimit = sessionStorage.getItem(SAVED_LIMIT_STORAGE_KEY);
    return savedLimit ? Number(savedLimit) : DEFAULT_LIMIT;
  });
  const [randomOrder, setRandomOrder] = useState(() => {
    const localRandomOrder = localStorage.getItem(RANDOM_ORDER_KEY);
    return localRandomOrder === '1' ? true : false;
  });
  const [zoomOut, setZoomOut] = useState(() => {
    const localZoomOut = localStorage.getItem(ZOOM_OUT_KEY);
    return localZoomOut === '1' ? true : false;
  });

  const recipesContainerRef = useRef<HTMLDivElement | null>(null);

  const { user } = useUser();
  const { recipes } = useRecipes();
  const { categories } = useCategories();

  const { slug } = useParams();

  const searchMode = search !== '';
  const { restoreScroll } = useScrollRestoration(!searchMode);
  const noRecipes = !searchMode && !recipesToShow;

  useEffect(() => {
    document.body.style.overflow = showShoppingList ? 'hidden' : 'visible';
  }, [showShoppingList]);

  useEffect(() => {
    restoreScroll();
  }, [restoreScroll]);

  useEffect(() => {
    if (categories) {
      const matchingCategory = slug
        ? getCategoryBySlug(categories, slug)
        : null;
      setSelectedCategory(matchingCategory);
    }
  }, [slug, categories]);

  useEffect(() => {
    if (!recipes) return;

    let matchingRecipes: Recipes | null = { ...recipes };
    let noResult = false;

    if (search) {
      matchingRecipes = searchMatchingRecipes(search, recipes);
      noResult = matchingRecipes === null;
    }

    if (matchingRecipes && !randomOrder) {
      matchingRecipes = reverseRecipes(matchingRecipes);
    }

    if (matchingRecipes && randomOrder) {
      matchingRecipes = shuffleRecipes(matchingRecipes);
    }

    const defaultCategoryIsSelected = selectedCategory === null;

    if (matchingRecipes && !search && !defaultCategoryIsSelected) {
      matchingRecipes = getRecipesByCategory(
        matchingRecipes,
        selectedCategory.id,
      );
    }

    setNoSearchResult(noResult);
    setRecipesToShow(matchingRecipes);
  }, [recipes, search, selectedCategory, randomOrder]);

  useEffect(() => {
    const onScroll = () => {
      if (!recipesToShow) {
        return;
      }
      const max = Object.keys(recipesToShow).length;
      if (limit >= max) {
        return;
      }

      if (!recipesContainerRef.current) {
        return;
      }

      const triggerMoreRecipesInPx =
        recipesContainerRef.current.offsetTop +
        recipesContainerRef.current.offsetHeight -
        900;

      if (window.scrollY + window.innerHeight > triggerMoreRecipesInPx) {
        setLimit(current => {
          const newLimit = current + DEFAULT_LIMIT;
          sessionStorage.setItem(SAVED_LIMIT_STORAGE_KEY, newLimit.toString());
          return newLimit;
        });
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [limit, recipesToShow]);

  const getTitle = () => {
    if (searchMode) {
      let nbRecipesToShow = 0;
      if (recipesToShow) nbRecipesToShow = Object.keys(recipesToShow).length;
      return `${nbRecipesToShow} ${nbRecipesToShow > 1 ? 'résultats' : 'résultat'}`;
    }

    if (selectedCategory) {
      let count = 0;
      count = recipes
        ? countRecipesByCategory(recipes, selectedCategory.id)
        : 0;
      return `${selectedCategory.name} (${count})`;
    }

    let nbRecipes = 0;
    if (recipes) nbRecipes = Object.keys(recipes).length;
    return `${nbRecipes} ${nbRecipes > 1 ? 'recettes' : 'recette'}`;
  };

  const toggleRandomOrder = () => {
    setRandomOrder(!randomOrder);
    localStorage.setItem(RANDOM_ORDER_KEY, !randomOrder ? '1' : '0');
  };

  const toggleZoomOut = () => {
    setZoomOut(!zoomOut);
    localStorage.setItem(ZOOM_OUT_KEY, zoomOut ? '0' : '1');
  };

  const handleMigration = () => {
    if (!recipes) return;

    const newRecipes: Recipes = {};

    Object.keys(recipes).forEach(key => {
      const recipe = recipes[key];
      if (!recipe) return;

      const stepsOldFormat = recipe.content;
      const stepsNewFormat: PreparationSteps = {};

      stepsOldFormat
        .split(/# ÉTAPE \d*/)
        .map(stepContent => stepContent.replace(/\n*/g, ''))
        .filter(stepContent => stepContent.length !== 0)
        .forEach((stepContent, index) => {
          const newStepKey = generateStepKey(key);
          stepsNewFormat[newStepKey] = {
            content: stepContent,
            position: index,
          };
        });

      newRecipes[key] = {
        ...recipe,
        steps: stepsNewFormat,
      };
    });

    const db = getDatabase();
    const recipesRef = ref(db, `recipes/`);
    return update(recipesRef, newRecipes);
  };

  return (
    <>
      {user && <Menu />}

      <Container>
        <div
          className={stack({
            direction: { base: 'column', sm: 'row' },
            align: { base: 'flex-start', sm: 'center' },
            gap: '1.35rem 0',
            justify: 'space-between',
            mt: '1.5rem',
          })}
        >
          <h1
            data-is-admin={!!user}
            className={hstack({
              color: 'primary',
              fontSize: { base: '1.5rem', xsm: '2rem', md: '2.3rem' },
              gap: '0',
              '&[data-is-admin=true]': {
                display: { base: 'none', md: 'flex' },
              },
            })}
          >
            <img
              src={logo}
              alt='logo'
              className={css({
                mr: '1.5',
                w: { base: '2.2rem', xsm: '2.8rem' },
              })}
            />
            My recipes
          </h1>
          <SearchBar search={search} setSearch={setSearch} isAdmin={!!user} />
        </div>

        <Wrap
          gap='0.5rem 1rem'
          justify='space-between'
          align='center'
          className={css({
            m: { base: '1.875rem 0 1.125rem', sm: '4rem 0 0.95rem' },
          })}
        >
          <h2
            className={css({
              fontSize: { base: '2.5rem', md: '3.05rem' },
              fontWeight: '600',
              color: 'text',
            })}
          >
            {getTitle()}
          </h2>
          {user && (
            <>
              <Button ml='auto' onClick={handleMigration}>
                Migration
              </Button>
              <Link
                className={button({
                  visual: 'outline',
                  color: 'primary',
                  size: 'sm',
                })}
                to={ROUTES.ADD_RECIPE}
                state={{ hasClickedLink: true }}
              >
                + Ajouter
              </Link>
            </>
          )}
        </Wrap>

        <Categories
          categories={categories}
          selectedCategory={selectedCategory}
          recipes={recipes}
        />

        <div
          className={flex({
            justify: 'center',
            m: '1.6rem 0 1rem',
          })}
        >
          <div
            className={flex({
              align: 'center',
              gap: { base: '0 0.6rem', sm: '0 0.8rem' },
              bg: 'white',
              rounded: 'full',
              p: { base: '0.2rem 0.6rem', sm: '0.4rem 0.8rem' },
            })}
          >
            <RecipeOptionButton
              onClick={toggleRandomOrder}
              active={randomOrder}
            >
              <Icon name='shuffle' fontSize='1.3rem' />
            </RecipeOptionButton>

            <RecipeOptionButton onClick={toggleZoomOut} active={zoomOut}>
              <Icon name='zoom_out' fontSize='1.3rem' />
            </RecipeOptionButton>
          </div>
        </div>

        {noSearchResult && (
          <NothingToShow
            src={noResultFoundImg}
            message='Aucun résultat ne correspond à votre recherche'
            alt='no result illustration'
            className={nothingToShowStyles}
          />
        )}

        {noRecipes && (
          <NothingToShow
            className={nothingToShowStyles}
            src={emptyIllustration}
            message={`Aucune recette à afficher`}
            alt='empty box illustration'
          />
        )}

        <div
          data-zoom-out={zoomOut}
          className={grid({
            gridTemplateColumns: {
              base: 'repeat(auto-fit, minmax(12rem, 1fr))',
              xsm: 'repeat(auto-fit, minmax(17.5rem, 1fr))',
            },
            gap: '2.19rem',
            '&[data-zoom-out=true]': {
              gridTemplateColumns: {
                base: 'repeat(auto-fit, minmax(7.5rem, 1fr))',
                xsm: 'repeat(auto-fit, minmax(10.75rem, 1fr))',
              },
              gap: '1rem',
            },
          })}
          ref={recipesContainerRef}
        >
          {recipesToShow &&
            Object.keys(recipesToShow)
              .slice(0, limit)
              .map(key => {
                const recipe = recipesToShow[key];
                if (!recipe) return null;

                return (
                  <RecipeCard
                    key={key}
                    id={key}
                    zoomOut={zoomOut}
                    {...recipe}
                  />
                );
              })}
        </div>

        <Overlay
          isShow={showShoppingList}
          close={() => setShowShoppingList(false)}
          className={css({ bg: 'rgba(0, 0, 0, 0.2)' })}
        >
          <ShoppingList
            closeShoppingList={() => setShowShoppingList(false)}
            isShow={showShoppingList}
          />
        </Overlay>
        <ShoppingListBtn setShowShoppingList={setShowShoppingList} />

        <Footer user={user} />
      </Container>
    </>
  );
};
