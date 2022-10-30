interface SearchBarProps {
  search: string;
  setSearch: (str: string) => void;
}

const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const wordToSearch = e.currentTarget.value;
    setSearch(wordToSearch);
  };

  const reset = () => setSearch('');

  const clearBtn = (
    <button
      className='clear-search'
      aria-label='effacer la recherche'
      onClick={reset}
    >
      <span className='material-icons-round'>clear</span>
    </button>
  );

  return (
    <div className='search-bar'>
      <input
        name='search'
        type='text'
        autoComplete='off'
        placeholder='Chercher une recette'
        aria-label='Chercher une recette'
        value={search}
        onChange={handleChange}
      />

      { search ? clearBtn : <span id='search-icon' className='material-icons-round'>search</span> }
    </div>
  );
};

export default SearchBar;
