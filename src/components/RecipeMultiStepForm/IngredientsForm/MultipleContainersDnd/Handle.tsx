import { css, cx } from '../../../../../styled-system/css';
import { button } from '../../../../recipes/button';

import { Icon } from '../../../Icon';
import { Action, ActionProps } from './Action';

export const Handle = (props: ActionProps) => {
  return (
    <Action
      {...props}
      cursor='grab'
      className={cx(
        props.className,
        button({
          visual: 'grey',
        }),
        css({
          p: '0.6rem 0.3rem',
          rounded: '0.3rem!',
          _hover: {
            bg: 'rgba(0, 0, 0, 0.05)',
            color: '#919eab',
          },
        }),
      )}
    >
      <Icon name='drag_indicator' fontSize='1.2rem' />
    </Action>
  );
};
