import { css, cx } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';
import { useShoppingList } from '../../hooks/useShoppingList';
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
  const { shoppingListRecipes: recipes } = useShoppingList();

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
            <h3>
              { recipes.length } { recipes.length > 1 ? 'recettes' : 'recette' }
            </h3>
          </Tab.Panel>
          <Tab.Panel>
            <p>Liste des ingrédients</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
