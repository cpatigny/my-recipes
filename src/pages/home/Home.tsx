import { useEffect, useState } from 'react';
import searchMatchingRecipes from '../../utils/recipes/searchMatchingRecipes';
import reverseObject from '../../utils/recipes/reverseRecipes';
import { Recipes } from '../../types/recipe';
import { useUser } from '../../providers/UserProvider';
import { useRecipes } from '../../providers/RecipesProvider';
import { useCategories } from '../../providers/CategoriesProvider';
import getRecipesByCategory from '../../utils/recipes/getRecipesByCategory';
import useScrollRestoration from '../../hooks/useScrollRestoration';
import { CategoryWithId } from '../../types/category';
import getCategoryBySlug from '../../utils/categories/getCategoryBySlug';
import countRecipesByCategory from '../../utils/categories/countRecipesByCategory';
import { ROUTES } from '../../utils/routes';

import { Link, useParams } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import NothingToShow from '../../components/NothingToShow/NothingToShow';
import Footer from '../../components/Footer/Footer';
import Categories from './Categories';
import Menu from '../../components/Menu/Menu';

import noResultFoundImg from '../../assets/img/undraw-lost-online.svg';
import logo from '../../assets/img/logo.svg';

import './Home.scss';

export const DEFAULT_CATEGORY = {
  id: '0',
  name: 'Tout',
};

const Home = () => {
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
      matchingRecipes = reverseObject(matchingRecipes);
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
    <div className='app container'>
      {user && <Menu />}

      <div className='top'>
        <h1><img src={logo} alt='logo' className='logo' />My recipes</h1>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <div className='wrap'>
        <h2 className='h1'>
          { getTitle() }
        </h2>
        { user && <Link className='btn btn-outline-primary' to={ROUTES.ADD_RECIPE} state={{ hasClickedLink: true }}>+ Ajouter</Link> }
      </div>

      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        recipes={recipes}
      />

      { noSearchResult &&
        <NothingToShow
          className='no-recipe-to-show'
          src={noResultFoundImg}
          message='Aucun résultat ne correspond à votre recherche'
          alt='no result illustration'
        />
      }

      <div className='recipes'>
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
    </div>
  );
};

export default Home;
