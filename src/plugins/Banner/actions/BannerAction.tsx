import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_BANNER_COMMAND } from '../commands';
import { ActionsContainer } from '@/components/ActionsContainer';
import { ActionButton } from '@/components/ActionButton';

export const BannerAction: React.FC = () => {
   const [editor] = useLexicalComposerContext();

   const handleOnClick = () => {
      editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined);
   };

   return (
      <ActionsContainer title="Banner action">
         <ActionButton onClick={handleOnClick}>Banner</ActionButton>
      </ActionsContainer>
   );
};
