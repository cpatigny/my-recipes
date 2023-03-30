import { useContext, useEffect, useState } from 'react';
import searchMatchingRecipes from '../../utils/searchMatchingRecipes';
import reverseObject from '../../utils/reverseRecipes';
import { Recipes } from '../../types/recipe';

import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import NothingToShow from '../../components/NothingToShow/NothingToShow';
import Footer from '../../components/Footer/Footer';
import { UserContext } from '../../providers/UserProvider';
import { RecipesContext } from '../../providers/RecipesProvider';

import noResultFoundImg from '../../assets/img/undraw-lost-online.svg';
import logo from '../../assets/img/logo.svg';

import './Home.scss';

const Home = () => {
  const [recipesToShow, setRecipesToShow] = useState<Recipes | null>(null);
  const [search, setSearch] = useState('');
  const [noSearchResult, setNoSearchResult] = useState(false);

  const { user } = useContext(UserContext);
  const { recipes } = useContext(RecipesContext);

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

    setNoSearchResult(noResult);
    setRecipesToShow(matchingRecipes);
  }, [recipes, search]);

  let nbRecipesToShow = 0;
  if (recipesToShow) nbRecipesToShow = Object.keys(recipesToShow).length;

  let nbRecipes = 0;
  if (recipes) nbRecipes = Object.keys(recipes).length;

  return (
    <div className='app container'>
      <div className='top'>
        <h1><img src={logo} alt='logo' className='logo' />My recipes</h1>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <div className='wrap'>
        <h2 className='h1'>
          { search === ''
            ? `Mes recettes (${nbRecipes})`
            : `${nbRecipesToShow} ${nbRecipesToShow > 1 ? 'résultats' : 'résultat'}`
          }
        </h2>
        { user && <Link className='btn btn-outline-primary' to='/add-recipe'>+ Add recipe</Link> }
      </div>

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
