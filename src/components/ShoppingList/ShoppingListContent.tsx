import { css, cx } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';
import { shoppingListContainer } from './ShoppingListHeader';
import { useShoppingList } from '../../contexts/ShoppingListContext';

import { Tab } from '@headlessui/react';
import { ShoppingListRecipesTab } from './ShoppingListRecipesTab';

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
  const { shoppingListRecipes } = useShoppingList();

  return (
    <div className={flex({ direction: 'column', h: '100%', bg: 'bg' })}>
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
            // big padding bottom because ShoppingListHeader isn't take into account
            // in the max height 100% so the content at the bottom is cut
            css({ py: '1rem 3.5rem', maxH: '100%', overflowY: 'auto' }),
          )}
        >
          <Tab.Panel>
            <ShoppingListRecipesTab recipes={shoppingListRecipes} />
          </Tab.Panel>
          <Tab.Panel>
            <p>Liste des ingrédients</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
