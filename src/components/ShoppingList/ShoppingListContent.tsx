import { css, cx } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';
import { useShoppingList } from '../../contexts/ShoppingListContext';

import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';
import { shoppingListContainer } from './ShoppingListHeader';
import { ShoppingListIngredientsTab } from './ShoppingListIngredientsTab';
import { ShoppingListRecipesTab } from './ShoppingListRecipesTab';

const tabStyles = css({
  flexGrow: 1,
  flexBasis: '50%',
  p: '0.6rem 1rem',
  borderBottom: '2px solid #ddd',
  color: 'text',
  textAlign: 'center',
  cursor: 'pointer',

  '&[data-selected]': {
    borderColor: 'primary',
    color: 'orange.550',
  },
});

const tabPanel = cx(
  shoppingListContainer,
  // big padding bottom because ShoppingListHeader isn't take into account
  // in the max height 100% so the content at the bottom is cut
  css({ py: '1rem 3.5rem', maxH: '100%', overflowY: 'auto' }),
);

export const ShoppingListContent = () => {
  const { shoppingListRecipes } = useShoppingList();

  return (
    <Tabs
      aria-label='Votre liste de courses'
      className={flex({ direction: 'column', h: '100%', bg: 'bg' })}
    >
      <TabList
        className={flex({
          justify: 'space-between',
        })}
      >
        <Tab id='1' className={tabStyles}>
          Recettes
        </Tab>
        <Tab id='2' className={tabStyles}>
          Ingrédients
        </Tab>
      </TabList>
      <TabPanel id='1' className={tabPanel}>
        <ShoppingListRecipesTab recipes={shoppingListRecipes} />
      </TabPanel>
      <TabPanel id='2' className={tabPanel}>
        <ShoppingListIngredientsTab recipes={shoppingListRecipes} />
      </TabPanel>
    </Tabs>
  );
};
