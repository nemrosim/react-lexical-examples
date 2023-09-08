import React, { PropsWithChildren, useContext, useState } from 'react';

interface ModalProviderContextProps {
   isVisible: boolean;
   openModal: (content: string) => void;
   closeModal: () => void;
   content: string;
}

const ModalProviderContext = React.createContext<ModalProviderContextProps>({
   isVisible: false,
   openModal: () => undefined,
   closeModal: () => undefined,
   content: '',
});

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
   const [isVisible, setIsVisible] = useState(false);
   const [content, setContent] = useState('');

   const openModal = (content: string) => {
      setContent(content);
      setIsVisible(true);
   };

   const closeModal = () => {
      setIsVisible(false);
   };

   return (
      <ModalProviderContext.Provider
         value={{
            isVisible,
            openModal,
            closeModal,
            content,
         }}
      >
         {children}
      </ModalProviderContext.Provider>
   );
};

export const useModalContext = (): ModalProviderContextProps => {
   const context = useContext<ModalProviderContextProps>(ModalProviderContext);

   if (context === null) {
      throw new Error(
         '"useModalContext" should be used inside a "ModalProvider"',
      );
   }

   return context;
};
