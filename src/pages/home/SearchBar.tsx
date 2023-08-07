import { css, cx } from '../../../styled-system/css';

import { Icon } from '../../components/Icon';

const placeholderColor = '#6b7280';

const iconStyles = css({
  display: 'flex!',
  justifyContent: 'center',
  alignItems: 'center',
  pos: 'absolute',
  top: '0',
  bottom: '0',
  bg: 'transparent',
  color: placeholderColor,
});

interface SearchBarProps {
  search: string;
  setSearch: (str: string) => void;
}

export const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const wordToSearch = e.currentTarget.value;
    setSearch(wordToSearch);
  };

  const reset = () => setSearch('');

  return (
    <div
      className={css({
        flexGrow: '1',
        w: '100%',
        pos: 'relative',
        maxW: { base: '100%', sm: '40%' },
        mt: { base: '0.5rem', sm: '0' },
      })}
    >
      <input
        name='search'
        type='text'
        autoComplete='off'
        placeholder='Chercher une recette'
        aria-label='Chercher une recette'
        value={search}
        onChange={handleChange}
        className={css({
          display: 'block',
          w: '100%',
          p: { base: '0.55rem 1.25rem 0.55rem 3.125rem', sm: '0.7rem 1.25rem 0.7rem 3.125rem' },
          borderRadius: 'full',
          fontSize: 'md',
          color: 'text',
          bg: 'white',
          outline: 'none',
          boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px',
          border: '1px solid transparent',
          _focus: { borderColor: 'primary' },
          _placeholder: { color: placeholderColor },
        })}
      />

      <Icon
        name='search'
        className={cx(
          iconStyles,
          css({
            left: '0.94rem',
            pointerEvents: 'none',
          }),
        )}
      />

      { search &&
        <button
          aria-label='effacer la recherche'
          onClick={reset}
          className={cx(
            iconStyles,
            css({ right: '0.7rem' }),
          )}
        >
          <Icon name='clear' />
        </button>
      }
    </div>
  );
};
