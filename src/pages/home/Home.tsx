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
} from '../../helpers/recipe.helpers';
import { useScrollRestoration } from '../../hooks/useScrollRestoration';
import { button } from '../../recipes/button';
import { ROUTES } from '../../routes';
import { CategoryWithId } from '../../types/category';
import { Recipes } from '../../types/recipe';

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

import logo from '../../assets/img/logo.svg';
import emptyIllustration from '../../assets/img/undraw-empty.svg';
import noResultFoundImg from '../../assets/img/undraw-lost-online.svg';
import { Overlay } from '../../components/Overlay';

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

const DEFAULT_LIMIT = 10;
export const SAVED_LIMIT_STORAGE_KEY = 'saved-recipe-nb-limit';

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

    if (matchingRecipes) {
      matchingRecipes = reverseRecipes(matchingRecipes);
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
  }, [recipes, search, selectedCategory]);

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
          )}
        </Wrap>

        <Categories
          categories={categories}
          selectedCategory={selectedCategory}
          recipes={recipes}
        />

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
          className={grid({
            minChildWidth: { base: '12rem', xsm: '17.5rem' },
            gap: '2.19rem',
          })}
          ref={recipesContainerRef}
        >
          {recipesToShow &&
            Object.keys(recipesToShow)
              .slice(0, limit)
              .map(key => {
                const recipe = recipesToShow[key];
                if (!recipe) return null;

                return <RecipeCard key={key} id={key} {...recipe} />;
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
