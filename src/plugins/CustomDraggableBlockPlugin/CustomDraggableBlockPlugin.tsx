import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DraggableElement, OnDragLine } from './components';
import { useOnDrop, useDragListeners } from './hooks';

export const CustomDraggableBlockPlugin: React.FC = () => {
   const [editor] = useLexicalComposerContext();

   useDragListeners();
   useOnDrop();

   const isEditable = editor.isEditable();

   if (!isEditable) {
      return null;
   }

   return (
      <>
         <DraggableElement />
         <OnDragLine />
      </>
   );
};
