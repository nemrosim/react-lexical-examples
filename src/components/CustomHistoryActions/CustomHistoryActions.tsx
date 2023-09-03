import { UNDO_COMMAND, REDO_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React from 'react';
import { ActionsContainer } from '../ActionsContainer';
import { ActionButton } from '../ActionButton';

export const CustomHistoryActions = () => {
   const [editor] = useLexicalComposerContext();
   return (
      <ActionsContainer title="History actions">
         <ActionButton
            onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
         >
            Undo
         </ActionButton>
         <ActionButton
            onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
         >
            Redo
         </ActionButton>
      </ActionsContainer>
   );
};
