import React from 'react';
import { LexicalEditor } from '@/components/LexicalEditor';

import './App.css';
import { FloatingMenuButton } from '@/components/FloatingMenuButton';
import { SharedHistoryContext } from './context/SharedHistoryContext';
import { Modal } from '@/components/Modal/Modal';
import { ModalProvider } from '@/components/Modal/context';
import { Toaster } from 'react-hot-toast';

export const App: React.FC = () => {
   return (
      <ModalProvider>
         <LexicalEditor>
            <SharedHistoryContext>
               <FloatingMenuButton />
            </SharedHistoryContext>
            <Modal />
         </LexicalEditor>
         <Toaster />
      </ModalProvider>
   );
};
