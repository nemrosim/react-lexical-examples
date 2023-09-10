import React, { PropsWithChildren } from 'react';

export const ListBlock: React.FC<PropsWithChildren> = ({ children }) => {
   return (
      <div className="flex flex-col divide-y divide-gray-600 pt-6">
         {children}
      </div>
   );
};
