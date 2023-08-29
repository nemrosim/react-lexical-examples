import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DRAGGABLE_WRAPPER_ID, DraggableElement, OnDragLine } from './components';
import { useOnDrop, useDragListeners } from './hooks';
import { createPortal } from 'react-dom';
import { useDraggableStore } from './store';

export const CustomDraggableBlockPlugin: React.FC = () => {
   const [editor] = useLexicalComposerContext();

   const { isMarkdown } = useDraggableStore();

   useDragListeners();
   useOnDrop();

   const isEditable = editor.isEditable();

   const wrapperHtmlElement = document.getElementById(DRAGGABLE_WRAPPER_ID);

   if (!isEditable || !wrapperHtmlElement || isMarkdown) {
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
