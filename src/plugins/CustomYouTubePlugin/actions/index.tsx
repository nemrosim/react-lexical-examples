import React, { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ActionsContainer } from '@/components/ActionsContainer';
import { ActionButton } from '@/components/ActionButton';
import { INSERT_YOUTUBE_COMMAND } from '../commands';

export const YouTubeActions: React.FC = () => {
   const [url, setUrl] = useState(
      'https://youtu.be/zBrkG3aeWCc?si=pvmQAnJpRBt0wTJN',
   );
   const [editor] = useLexicalComposerContext();

   const handleOnClick = () => {
      const match =
         /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(
            url,
         );

      const id = match ? (match?.[2].length === 11 ? match[2] : null) : null;

      if (id) {
         editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, id);
      }
   };

   return (
      <ActionsContainer title="YouTube action">
         <ActionButton onClick={handleOnClick}>YouTube</ActionButton>
         <input
            placeholder="Youtube url"
            value={url}
            onChange={(event) => {
               setUrl(event.target.value);
            }}
         ></input>
      </ActionsContainer>
   );
};
