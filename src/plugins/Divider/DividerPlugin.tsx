import React, { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import {
   $getSelection,
   $isRangeSelection,
   COMMAND_PRIORITY_EDITOR,
} from 'lexical';
import { INSERT_DIVIDER_COMMAND } from './commands';
import { $createDividerNode } from './node/utils';
import { DividerNode } from '@/plugins/Divider/node';

export const DividerPlugin: React.FC = () => {
   const [editor] = useLexicalComposerContext();

   if (!editor.hasNode(DividerNode)) {
      throw new Error('DividerNode: "DividerNode" not registered on editor');
   }

   useEffect(() => {
      return editor.registerCommand(
         INSERT_DIVIDER_COMMAND,
         (type) => {
            const selection = $getSelection();

            if (!$isRangeSelection(selection)) {
               return false;
            }

            const focusNode = selection.focus.getNode();

            if (focusNode !== null) {
               const horizontalRuleNode = $createDividerNode();
               $insertNodeToNearestRoot(horizontalRuleNode);
            }

            return true;
         },
         COMMAND_PRIORITY_EDITOR,
      );
   }, [editor]);

   return null;
};
