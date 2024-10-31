import { cva } from '../../styled-system/css';

export const combobox = cva({
  base: {
    pos: 'relative',

    '& input': {
      py: '0.375rem',
      borderBottom: '1px solid #dadce0',
      outline: 'none',
      transitionDuration: '200ms',
      _placeholder: { color: '#6D6D6D' },

      '&[data-error=true]': {
        borderColor: 'danger',
        _placeholder: { color: 'danger' },
      },
      '&[data-error=false]': {
        _focus: {
          borderColor: 'primary',
        },
      },
    },

    '& > div': {
      pos: 'absolute',
      zIndex: '999',
      w: '100%',
      mt: '0.3rem',
      rounded: 'lg',
      bg: 'white',
      shadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
      overflowY: 'auto',
      maxH: '6rem',

      // when there is no match
      '& .no-match': {
        p: '0.5rem 0.8rem',
        color: '#989fac',
      },

      // combobox option
      '& div': {
        p: '0.3rem 0.8rem',
        w: '100%',
        fontSize: '1.1rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        pos: 'relative',

        '& .icon': {
          pos: 'absolute',
          color: 'orange.450',
          fontSize: '1.2rem!',
        },

        '&[data-an-option-is-selected=true] span:not(.icon)': {
          pl: '1.5rem',
        },

        '&[data-focus]': {
          bg: 'orange.450',
          color: 'white',
        },

        '&[data-selected] span': {
          fontWeight: '600',
        },

        '&[data-focus][data-selected] .icon': {
          color: 'white',
        },
      },
    },
  },
});
