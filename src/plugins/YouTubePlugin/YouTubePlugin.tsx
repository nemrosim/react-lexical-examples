import React, { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import { COMMAND_PRIORITY_EDITOR } from 'lexical';

import { $createYouTubeNode, YouTubeNode } from './nodes';
import { INSERT_YOUTUBE_COMMAND } from './commands';

export const YouTubePlugin: React.FC = () => {
   const [editor] = useLexicalComposerContext();

   useEffect(() => {
      if (!editor.hasNodes([YouTubeNode])) {
         throw new Error('YouTubePlugin: YouTubeNode not registered on editor');
      }

      return editor.registerCommand<string>(
         INSERT_YOUTUBE_COMMAND,
         (payload) => {
            const youTubeNode = $createYouTubeNode(payload);
            $insertNodeToNearestRoot(youTubeNode);

            return true;
         },
         COMMAND_PRIORITY_EDITOR,
      );
   }, [editor]);

   return null;
};
