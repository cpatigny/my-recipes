import { useEffect, useState } from 'react';
import { Recipes } from '../../types/recipe';
import { useUser } from '../../contexts/UserContext';
import { useRecipes } from '../../contexts/RecipesContext';
import { useCategories } from '../../contexts/CategoriesContext';
import { useScrollRestoration } from '../../hooks/useScrollRestoration';
import { CategoryWithId } from '../../types/category';
import { ROUTES } from '../../routes';
import { getCategoryBySlug, countRecipesByCategory } from '../../helpers/category.helpers';
import { searchMatchingRecipes, getRecipesByCategory, reverseRecipes } from '../../helpers/recipe.helpers';
import { css } from '../../../styled-system/css';
import { flex, grid, hstack, stack } from '../../../styled-system/patterns';
import { button } from '../../recipes/button';

import { Link, useParams } from 'react-router-dom';
import { RecipeCard } from './RecipeCard';
import { SearchBar } from './SearchBar';
import { NothingToShow } from '../../components/NothingToShow';
import { Footer } from '../../components/Footer';
import { Categories } from './Categories';
import { Menu } from '../../components/Menu/Menu';
import { Wrap } from '../../../styled-system/jsx';
import { Container } from '../../components/Container';

import noResultFoundImg from '../../assets/img/undraw-lost-online.svg';
import emptyIllustration from '../../assets/img/undraw-empty.svg';
import logo from '../../assets/img/logo.svg';

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

export const Home = () => {
  const [recipesToShow, setRecipesToShow] = useState<Recipes | null>(null);
  const [search, setSearch] = useState('');
  const [noSearchResult, setNoSearchResult] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithId | null>(null);

  const { user } = useUser();
  const { recipes } = useRecipes();
  const { categories } = useCategories();

  const { slug } = useParams();

  const searchMode = search !== '';
  const { restoreScroll } = useScrollRestoration(!searchMode);
  const noRecipes = !searchMode && !recipesToShow;

  useEffect(() => {
    restoreScroll();
  }, [restoreScroll]);

  useEffect(() => {
    if (categories) {
      const matchingCategory = slug ? getCategoryBySlug(categories, slug) : null;
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
      matchingRecipes = getRecipesByCategory(matchingRecipes, selectedCategory.id);
    }

    setNoSearchResult(noResult);
    setRecipesToShow(matchingRecipes);
  }, [recipes, search, selectedCategory]);

  const getTitle = () => {
    if (searchMode) {
      let nbRecipesToShow = 0;
      if (recipesToShow) nbRecipesToShow = Object.keys(recipesToShow).length;
      return `${nbRecipesToShow} ${nbRecipesToShow > 1 ? 'résultats' : 'résultat'}`;
    }

    if (selectedCategory) {
      let count = 0;
      count = recipes ? countRecipesByCategory(recipes, selectedCategory.id) : 0;
      return `${selectedCategory.name} (${count})`;
    }

    let nbRecipes = 0;
    if (recipes) nbRecipes = Object.keys(recipes).length;
    return `Mes recettes (${nbRecipes})`;
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
            className={hstack({
              color: 'primary',
              fontSize: { base: '1.5rem', xsm: '2rem', md: '2.3rem' },
              gap: '0',
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
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <Wrap gap='0.5rem 1rem' justify='space-between' align='center' className={css({
          m: { base: '1.875rem 0 1.125rem', sm: '4rem 0 0.95rem' },
        })}>
          <h2
            className={css({
              fontSize: { base: '2.5rem', md: '3.05rem' },
              fontWeight: '600',
              color: 'text',
            })}
          >
            { getTitle() }
          </h2>
          {user && (
            <Link
              className={button({ visual: 'outline', color: 'primary', size: 'sm' })}
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

        { noSearchResult &&
          <NothingToShow
            src={noResultFoundImg}
            message='Aucun résultat ne correspond à votre recherche'
            alt='no result illustration'
            className={nothingToShowStyles}
          />
        }

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
        >
          { recipesToShow && Object.keys(recipesToShow).map(key => {
            const recipe = recipesToShow[key];
            if (!recipe) return null;

            return (
              <RecipeCard
                key={key}
                title={recipe.title}
                imageName={recipe.imageName}
                slug={recipe.slug}
              />
            );
          })}
        </div>

        <Footer user={user} />
      </Container>
    </>
  );
};
