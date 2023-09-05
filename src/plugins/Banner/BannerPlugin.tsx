import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
   $getSelection,
   $isRangeSelection,
   COMMAND_PRIORITY_NORMAL,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { BannerNode, $createBannerNode } from './nodes';
import { INSERT_BANNER_COMMAND } from './commands';

export const BannerPlugin: React.FC = () => {
   const [editor] = useLexicalComposerContext();

   if (!editor.hasNode(BannerNode)) {
      throw new Error('BannerPlugin: "BannerNode" not registered on editor');
   }
   editor.registerCommand(
      INSERT_BANNER_COMMAND,
      () => {
         const selection = $getSelection();
         if ($isRangeSelection(selection)) {
            $setBlocksType(selection, $createBannerNode);
         }
         return true;
      },
      COMMAND_PRIORITY_NORMAL,
   );

   return null;
};
