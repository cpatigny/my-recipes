import { useEffect, useState } from 'react';
import { Recipes } from '../../types/recipe';
import { useUser } from '../../contexts/UserContext';
import { useRecipes } from '../../contexts/RecipesContext';
import { useCategories } from '../../contexts/CategoriesContext';
import useScrollRestoration from '../../hooks/useScrollRestoration';
import { CategoryWithId } from '../../types/category';
import { ROUTES } from '../../routes';
import { getCategoryBySlug, countRecipesByCategory } from '../../helpers/category.helpers';
import { searchMatchingRecipes, getRecipesByCategory, reverseRecipes } from '../../helpers/recipe.helpers';

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
