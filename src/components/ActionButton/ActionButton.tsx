import React, { PropsWithChildren } from 'react';
import './styles.css';

interface ActionButtonProps
   extends PropsWithChildren,
      Omit<
         React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
         >,
         'className'
      > {}

export const ActionButton: React.FC<ActionButtonProps> = ({
   children,
   ...props
}) => {
   return (
      <button className="button-45" {...props}>
         {children}
      </button>
   );
};
