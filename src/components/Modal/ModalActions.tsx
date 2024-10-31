import { wrap } from '../../../styled-system/patterns';

export const ModalActions = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={wrap({
        w: '100%',
        flexDirection: { base: 'column', xsm: 'row' },
        align: { base: 'stretch', xsm: 'center' },
        gap: '0.6rem 0.4rem',
        mt: '1.6rem',
        '& button': {
          w: { base: '100%', xsm: 'auto' },
        },
      })}
    >
      {children}
    </div>
  );
};
