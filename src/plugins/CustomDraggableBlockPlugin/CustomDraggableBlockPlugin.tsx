import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DRAGGABLE_WRAPPER_ID, DraggableElement, OnDragLine } from './components';
import { useOnDrop, useDragListeners } from './hooks';
import { createPortal } from 'react-dom';

export const CustomDraggableBlockPlugin: React.FC = () => {
   const [editor] = useLexicalComposerContext();

   useDragListeners();
   useOnDrop();

   const isEditable = editor.isEditable();

   const wrapperHtmlElement = document.getElementById(DRAGGABLE_WRAPPER_ID);

   if (!isEditable || !wrapperHtmlElement) {
      return null;
   }

   return createPortal(
      <>
         <DraggableElement />
         <OnDragLine />
      </>,
      wrapperHtmlElement,
   );
};
