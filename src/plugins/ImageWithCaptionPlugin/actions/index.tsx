import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_IMAGE_WITH_CAPTION_COMMAND } from '../commands';
import { ActionsContainer } from '@/components/ActionsContainer';
import { ActionButton } from '@/components/ActionButton';

export const ImageWithCaptionAction: React.FC = () => {
   const [editor] = useLexicalComposerContext();

   const handleOnClick = () => {
      editor.dispatchCommand(INSERT_IMAGE_WITH_CAPTION_COMMAND, undefined);
   };

   return (
      <ActionsContainer title="Image With Caption Action">
         <ActionButton onClick={handleOnClick}>
            Image With Caption Action
         </ActionButton>
      </ActionsContainer>
   );
};
