import React, { CSSProperties } from 'react';

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  cursor?: CSSProperties['cursor'];
}

export const Action = ({ className, cursor, style, ...props }: ActionProps) => {
  return (
    <button
      {...props}
      className={`action ${className ?? ''}`}
      tabIndex={0}
      style={{
        ...style,
        cursor,
      }}
    />
  );
};
