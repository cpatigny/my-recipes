import { GroupWithIngredients } from '../../types/recipe';

import Group from './Group';

interface GroupListProps {
  groups: GroupWithIngredients[];
}

const GroupList = ({ groups }: GroupListProps) => (
  <>
    {groups.map(group => (
      <Group key={group.id} {...group} />
    ))}
  </>
);

export default GroupList;
