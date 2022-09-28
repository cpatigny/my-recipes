import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { getAuth, signOut } from 'firebase/auth';
import { RecipesContext } from '../../providers/RecipesProvider';
import { strContains } from '../../services/strContains';

import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import NothingToShow from '../../components/NothingToShow/NothingToShow';

import noResultFoundImg from '../../assets/img/undraw-lost-online.svg';
import logo from '../../assets/img/logo.svg';

import './App.scss';

const App = () => {

  const [recipesToShow, setRecipesToShow] = useState(false);
  const [search, setSearch] = useState('');
  const [noSearchResult, setNoSearchResult] = useState(false);
  const [orderBy, setOrderBy] = useState(localStorage.getItem('orderBy') ? localStorage.getItem('orderBy') : 'desc');

  let { user, setUser, userData } = useContext(UserContext);
  let { recipes } = useContext(RecipesContext);

  useEffect(() => {
    if (recipes === 'loading' || recipes === null) return;
    
    let matchingRecipes = recipes;
    let noResult = false;

    if (search) {
      matchingRecipes = searchMatchingRecipes(search, recipes);
      noResult = matchingRecipes === null;
    }

    if (orderBy === 'desc' && matchingRecipes) {
      let reverseRecipes = {};

      Object
        .keys(matchingRecipes)
        .reverse()
        .forEach(key => {
          reverseRecipes[key] = matchingRecipes[key];
        });

      matchingRecipes = reverseRecipes;
    }

    setNoSearchResult(noResult);
    setRecipesToShow(matchingRecipes);
  }, [recipes, search, orderBy]);

  const searchMatchingRecipes = (search, recipes) => {
    let matchingRecipes = {};

    Object
      .keys(recipes)
      .filter(key => strContains(recipes[key].title, search))
      .forEach(key => matchingRecipes[key] = recipes[key]);
      
    if (Object.keys(matchingRecipes).length === 0) matchingRecipes = null;

    return matchingRecipes;
  };

  const handleSignOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => setUser(false))
      .catch(error => console.error(error));
  };

  const handleOrderByChange = e => {
    let value = e.target.value;
    setOrderBy(value);
    localStorage.setItem('orderBy', value);
  }

  let nbRecipesToShow = 0;
  if (recipesToShow) nbRecipesToShow = Object.keys(recipesToShow).length;

  if (user === 'loading' || userData === 'loading' || recipes === 'loading') return <Loading />;

  return (
    <div className='app container'>
      <div className='top'>
        <h1><img src={logo} alt='logo' className='logo' />My recipes</h1>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <div className='wrap'>
        <h2 className='h1'>
          { search === '' 
            ? `Liste des recettes (${ Object.keys(recipes).length })`
            : `${nbRecipesToShow} résultat(s)`
          }
        </h2>
        { user && <Link className='btn btn-outline-primary' to='/add-recipe'>+ Add recipe</Link> }
      </div>

      { !noSearchResult &&
        <div className='options'>
          <select name='order-by' value={orderBy} onChange={handleOrderByChange}>
            <option value='desc'>Du plus récent au plus ancien</option>
            <option value='asc'>Du plus ancien au plus récent</option>
          </select>
        </div>
      }

      { noSearchResult && 
        <NothingToShow
          className='no-recipe-to-show'
          src={noResultFoundImg}
          message='Aucun résultat ne correspond à votre recherche'
          alt='no result illustration'
        />
      }
        
      <div className='recipes'>
        { recipesToShow && Object.keys(recipesToShow).map(key => (
          <RecipeCard
            key={key}
            title={recipesToShow[key].title}
            imageName={recipesToShow[key].imageName}
            slug={recipesToShow[key].slug}
          />
        ))}
      </div>

      <footer>
        <p>Made by <span className='name'>Clément</span></p>
        <div className='admin'>
          { user 
              ? <button className='sign-out' onClick={handleSignOut}>Déconnexion</button> 
              : <Link to='/admin'>Admin</Link>
          }
          { user && <Link to='/categories'>Catégories</Link> }
        </div>
      </footer>
    </div>
  );
}

export default App;
