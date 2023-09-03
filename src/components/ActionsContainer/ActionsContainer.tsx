import React, { PropsWithChildren } from 'react';
import '../ActionButton/styles.css';

interface ActionsContainerProps extends PropsWithChildren {
   title: string;
}

export const ActionsContainer: React.FC<ActionsContainerProps> = ({
   title,
   children,
}) => {
   return (
      <div style={{ marginTop: '10px' }}>
         <span style={{ fontWeight: 'bold' }}>{title}</span>
         <div
            style={{
               display: 'flex',
               flexDirection: 'row',
               flexWrap: 'wrap',
               gap: '5px',
               marginTop: '4px',
            }}
         >
            {children}
         </div>
      </div>
   );
};
