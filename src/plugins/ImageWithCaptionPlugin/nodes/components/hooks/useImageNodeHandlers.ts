import { useCallback, useEffect, useRef, useState } from 'react';
import {
   $getNodeByKey,
   $getSelection,
   $isNodeSelection,
   $setSelection,
   CLICK_COMMAND,
   COMMAND_PRIORITY_LOW,
   KEY_BACKSPACE_COMMAND,
   KEY_DELETE_COMMAND,
   KEY_ENTER_COMMAND,
   LexicalEditor,
   SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isImageWithCaptionNode } from '@/plugins/ImageWithCaptionPlugin/nodes/ImageWithCaptionNode';
import { ImageWithCaptionProps } from '@/plugins/ImageWithCaptionPlugin/nodes/components';
import { mergeRegister } from '@lexical/utils';

export const useImageNodeHandlers = ({
   lexicalNodeKey,
   caption,
}: ImageWithCaptionProps) => {
   const [isSelected, setSelected] = useState(false);

   const activeEditorRef = useRef<LexicalEditor | null>(null);

   const [editor] = useLexicalComposerContext();

   // const onDelete = useCallback(
   //    (payload: KeyboardEvent) => {
   //       if ($isNodeSelection($getSelection())) {
   //          const event: KeyboardEvent = payload;
   //          event.preventDefault();
   //          const node = $getNodeByKey(lexicalNodeKey);
   //          if ($isImageWithCaptionNode(node)) {
   //             node.remove();
   //          }
   //       }
   //       return false;
   //    },
   //    [lexicalNodeKey],
   // );

   // const onEscape = useCallback(
   //    (event: KeyboardEvent) => {
   //       if (activeEditorRef.current === caption) {
   //          $setSelection(null);
   //          editor.update(() => {
   //             setSelected(true);
   //             const parentRootElement = editor.getRootElement();
   //             if (parentRootElement !== null) {
   //                parentRootElement.focus();
   //             }
   //          });
   //          return true;
   //       }
   //       return false;
   //    },
   //    [caption, editor, setSelected],
   // );

   const onEnter = useCallback(
      (event: KeyboardEvent) => {
         const latestSelection = $getSelection();
         if (
            isSelected &&
            $isNodeSelection(latestSelection) &&
            latestSelection.getNodes().length === 1
         ) {
            // Move focus into nested editor
            $setSelection(null);
            event.preventDefault();
            caption.focus();
            return true;
         }
         return false;
      },
      [caption, isSelected],
   );

   useEffect(() => {
      return mergeRegister(
         /**
          * This is required for root lexical state
          * Without this your changes will not be stored in a JSON format
          */
         // editor.registerCommand(
         //    SELECTION_CHANGE_COMMAND,
         //    (_, activeEditor) => {
         //       console.log('ACTIVE EDITOR', activeEditor);
         //       activeEditorRef.current = activeEditor;
         //       return false;
         //    },
         //    COMMAND_PRIORITY_LOW,
         // ),
         editor.registerCommand(
            KEY_ENTER_COMMAND,
            onEnter,
            COMMAND_PRIORITY_LOW,
         ),

         editor.registerCommand(
            CLICK_COMMAND,
            (event: MouseEvent) => {
               const hrElem = editor.getElementByKey(lexicalNodeKey);

               setSelected(!isSelected);
               return true;
            },
            COMMAND_PRIORITY_LOW,
         ),
         // editor.registerCommand(
         //    KEY_DELETE_COMMAND,
         //    onDelete,
         //    COMMAND_PRIORITY_LOW,
         // ),
         // editor.registerCommand(
         //    KEY_BACKSPACE_COMMAND,
         //    onDelete,
         //    COMMAND_PRIORITY_LOW,
         // ),
      );
   }, [
      editor,
      isSelected,
      lexicalNodeKey,
      // onDelete,
      onEnter,
   ]);

   return {
      isSelected,
   };
};
