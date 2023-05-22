import { GroupWithIngredients } from '../../types/recipe';

import { Group } from './Group';

interface GroupListProps {
  groups: GroupWithIngredients[];
  servingRatio?: number;
}

export const GroupList = ({ groups, servingRatio }: GroupListProps) => (
  <>
    {groups.map(group => (
      <Group key={group.id} servingRatio={servingRatio} {...group} />
    ))}
  </>
);
