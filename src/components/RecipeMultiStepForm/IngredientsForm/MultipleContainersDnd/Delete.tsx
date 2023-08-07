import { cx } from '../../../../../styled-system/css';
import { button } from '../../../../recipes/button';

import { Icon } from '../../../Icon/Icon';
import { ActionProps, Action } from './Action';

export const Delete = (props: ActionProps) => {
  return (
    <Action
      {...props}
      className={cx(
        props.className,
        button({ visual: 'grey', color: 'danger', size: 'sm', circle: true }),
      )}
    >
      <Icon name='clear' fontSize='1.2rem' />
    </Action>
  );
};
