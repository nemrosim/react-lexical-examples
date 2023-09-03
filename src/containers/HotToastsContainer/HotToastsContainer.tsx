import React, { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

export const HotToastsContainer: React.FC<PropsWithChildren> = ({ children }) => {
   return (
      <>
         {children}
         <Toaster
            toastOptions={{
               duration: 750,
            }}
         />
      </>
   );
};
