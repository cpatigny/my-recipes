import React, { useEffect, useState } from 'react';
import searchMatchingRecipes from '../../utils/searchMatchingRecipes';
import reverseObject from '../../utils/reverseRecipes';
import { useAppSelector } from '../../app/hooks';
import { Recipes } from '../../types/recipe';

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
  const oderByDefaultValue = localStorage.getItem('orderBy') === 'desc' ? 'desc' : 'asc';

  const [recipesToShow, setRecipesToShow] = useState<Recipes | null>(null);
  const [search, setSearch] = useState('');
  const [noSearchResult, setNoSearchResult] = useState(false);
  const [orderBy, setOrderBy] = useState<'desc' | 'asc'>(oderByDefaultValue);

  const { user } = useAppSelector(state => state.user);
  const { recipes } = useAppSelector(state => state.recipe);

  useEffect(() => {
    if (!recipes) return;

    let matchingRecipes: Recipes | null = { ...recipes };
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

  const handleOrderByChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setOrderBy(value === 'desc' ? 'desc' : 'asc');
    localStorage.setItem('orderBy', value);
  };

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
