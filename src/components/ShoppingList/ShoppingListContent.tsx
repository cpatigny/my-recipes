import { css, cx } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';
import { useShoppingList } from '../../contexts/ShoppingListContext';
import { shoppingListContainer } from './ShoppingListHeader';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { ShoppingListIngredientsTab } from './ShoppingListIngredientsTab';
import { ShoppingListRecipesTab } from './ShoppingListRecipesTab';

const tabStyles = css({
  flexGrow: 1,
  flexBasis: '50%',
  p: '0.6rem 1rem',
  borderBottom: '2px solid #ddd',
  color: 'text',

  '&[data-selected]': {
    borderColor: 'primary',
    color: 'orange.550',
  },
});

export const ShoppingListContent = () => {
  const { shoppingListRecipes } = useShoppingList();

  return (
    <TabGroup className={flex({ direction: 'column', h: '100%', bg: 'bg' })}>
      <TabList
        className={flex({
          justify: 'space-between',
        })}
      >
        <Tab className={tabStyles}>Recettes</Tab>
        <Tab className={tabStyles}>Ingrédients</Tab>
      </TabList>
      <TabPanels
        className={cx(
          shoppingListContainer,
          // big padding bottom because ShoppingListHeader isn't take into account
          // in the max height 100% so the content at the bottom is cut
          css({ py: '1rem 3.5rem', maxH: '100%', overflowY: 'auto' }),
        )}
      >
        <TabPanel>
          <ShoppingListRecipesTab recipes={shoppingListRecipes} />
        </TabPanel>
        <TabPanel>
          <ShoppingListIngredientsTab recipes={shoppingListRecipes} />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};
