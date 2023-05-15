import Icon from '../../../Icon/Icon';
import { ActionProps, Action } from './Action';

export const Delete = (props: ActionProps) => {
  return (
    <Action {...props} className='delete-group'>
      <Icon name='clear' className='delete-icon' />
    </Action>
  );
};
