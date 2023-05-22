import { Icon } from '../../../Icon/Icon';
import { Action, ActionProps } from './Action';

export const Handle = (props: ActionProps) => {
  return (
    <Action
      cursor='grab'
      {...props}
    >
      <Icon name='drag_indicator' className='drag-icon' />
    </Action>
  );
};
