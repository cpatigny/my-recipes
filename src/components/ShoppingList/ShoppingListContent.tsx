import { css, cx } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';
import { shoppingListContainer } from './ShoppingListHeader';

import { Tab } from '@headlessui/react';

const tabStyles = css({
  flexGrow: 1,
  p: '0.6rem 1rem',
  borderBottom: '2px solid #ddd',
  color: 'text',

  '&[data-headlessui-state=selected]': {
    borderColor: 'primary',
    color: 'orange.550',
  },
});

export const ShoppingListContent = () => {
  return (
    <div className={css({ bg: 'bg', h: '100%' })}>
      <Tab.Group>
        <Tab.List
          className={flex({
            justify: 'space-between',
          })}
        >
          <Tab className={tabStyles}>Recettes</Tab>
          <Tab className={tabStyles}>Ingrédients</Tab>
        </Tab.List>
        <Tab.Panels
          className={cx(
            shoppingListContainer,
            css({ py: '1rem' }),
          )}
        >
          <Tab.Panel>
            <p>Liste des recettes a faire</p>
          </Tab.Panel>
          <Tab.Panel>
            <p>Liste des ingrédients</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
