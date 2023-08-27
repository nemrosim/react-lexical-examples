import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DraggableBlock } from './components/DraggableBlock';
import { DraggableLine } from './components/DraggableLine';
import { useOnDrop, useListeners } from './hooks';

import './CustomDraggableBlockPlugin.css';

export const CustomDraggableBlockPlugin: React.FC = () => {
   const [editor] = useLexicalComposerContext();
   useOnDrop();
   useListeners();

   const isEditable = editor.isEditable();

   if (!isEditable) {
      return null;
   }

   return (
      <>
         <DraggableBlock />
         <DraggableLine />
      </>
   );
};
