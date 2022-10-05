import React, { useEffect, useState } from 'react';
import searchMatchingRecipes from '../../utils/searchMatchingRecipes';
import { useSelector } from 'react-redux';
import reverseObject from '../../utils/reverseObject';

import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import NothingToShow from '../../components/NothingToShow/NothingToShow';
import Options from './Options';
import Footer from '../../components/Footer/Footer';

import noResultFoundImg from '../../assets/img/undraw-lost-online.svg';
import logo from '../../assets/img/logo.svg';

import './Home.scss';

const Home = () => {
  const [recipesToShow, setRecipesToShow] = useState(false);
  const [search, setSearch] = useState('');
  const [noSearchResult, setNoSearchResult] = useState(false);
  const [orderBy, setOrderBy] = useState(localStorage.getItem('orderBy') ? localStorage.getItem('orderBy') : 'desc');

  const { user } = useSelector(state => state.user);
  const { recipes } = useSelector(state => state.recipe);

  useEffect(() => {
    if (!recipes) return;

    let matchingRecipes = recipes;
    let noResult = false;

    if (search) {
      matchingRecipes = searchMatchingRecipes(search, recipes);
      noResult = matchingRecipes === null;
    }

    if (orderBy === 'desc' && matchingRecipes) {
      matchingRecipes = reverseObject(matchingRecipes);
    }

    setNoSearchResult(noResult);
    setRecipesToShow(matchingRecipes);
  }, [recipes, search, orderBy]);

  const handleOrderByChange = e => {
    const { value } = e.target;
    setOrderBy(value);
    localStorage.setItem('orderBy', value);
  };

  let nbRecipesToShow = 0;
  if (recipesToShow) nbRecipesToShow = Object.keys(recipesToShow).length;

  return (
    <div className='app container'>
      <div className='top'>
        <h1><img src={logo} alt='logo' className='logo' />My recipes</h1>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <div className='wrap'>
        <h2 className='h1'>
          { search === ''
            ? `Mes recettes (${Object.keys(recipes).length})`
            : `${nbRecipesToShow} résultat(s)`
          }
        </h2>
        { user && <Link className='btn btn-outline-primary' to='/add-recipe'>+ Add recipe</Link> }
      </div>

      { !noSearchResult && <Options orderBy={orderBy} handleOrderByChange={handleOrderByChange} /> }

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

      <Footer user={user} />
    </div>
  );
};

export default Home;
