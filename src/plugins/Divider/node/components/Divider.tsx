import React, { useCallback, useEffect } from 'react';
import {
   $getNodeByKey,
   $getSelection,
   $isNodeSelection,
   CLICK_COMMAND,
   COMMAND_PRIORITY_LOW,
   KEY_BACKSPACE_COMMAND,
   KEY_DELETE_COMMAND,
   NodeKey,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { $isDividerNode } from '../utils';
import './styles.css';

interface DividerProps {
   nodeKey: NodeKey;
}

export const Divider: React.FC<DividerProps> = ({ nodeKey }) => {
   const [editor] = useLexicalComposerContext();
   const [isSelected, setSelected, clearSelection] =
      useLexicalNodeSelection(nodeKey);

   const onDelete = useCallback(
      (event: KeyboardEvent) => {
         if (isSelected && $isNodeSelection($getSelection())) {
            event.preventDefault();
            const node = $getNodeByKey(nodeKey);
            if (node && $isDividerNode(node)) {
               node.remove();
            }
         }
         return false;
      },
      [isSelected, nodeKey],
   );

   useEffect(() => {
      return mergeRegister(
         editor.registerCommand(
            CLICK_COMMAND,
            (event: MouseEvent) => {
               const hrElem = editor.getElementByKey(nodeKey);

               if (event.target === hrElem) {
                  if (!event.shiftKey) {
                     clearSelection();
                  }
                  setSelected(!isSelected);
                  return true;
               }

               return false;
            },
            COMMAND_PRIORITY_LOW,
         ),
         editor.registerCommand(
            KEY_DELETE_COMMAND,
            onDelete,
            COMMAND_PRIORITY_LOW,
         ),
         editor.registerCommand(
            KEY_BACKSPACE_COMMAND,
            onDelete,
            COMMAND_PRIORITY_LOW,
         ),
      );
   }, [clearSelection, editor, isSelected, nodeKey, onDelete, setSelected]);

   useEffect(() => {
      const hrElem = editor.getElementByKey(nodeKey);
      if (hrElem !== null) {
         if (isSelected) {
            hrElem.classList.add('divider-selected');
         } else {
            hrElem.classList.remove('divider-selected');
         }
      }
   }, [editor, isSelected, nodeKey]);

   return null;
};
