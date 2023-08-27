import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DraggableBlock } from './DraggableBlock';
import { DraggableLine } from './DraggableLine';
import { useOnDrop } from './useOnDrop';
import { useListeners } from './useListeners';

import './style.css';

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
