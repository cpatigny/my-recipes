interface SearchBarProps {
  search: string;
  setSearch: (str: string) => void;
}

const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const wordToSearch = e.currentTarget.value;
    setSearch(wordToSearch);
  };

  const reset = () => setSearch('');

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

      <span id='search-icon' className='material-icons-round'>search</span>

      { search &&
        <button
          className='clear-search'
          aria-label='effacer la recherche'
          onClick={reset}
        >
          <span className='material-icons-round'>clear</span>
        </button>
      }
    </div>
  );
};

export default SearchBar;
