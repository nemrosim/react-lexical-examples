import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_BANNER_COMMAND } from '../../plugins';
import { ActionsContainer } from '../ActionsContainer';
import { ActionButton } from '../ActionButton';

export const CustomBannerActions: React.FC = () => {
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
