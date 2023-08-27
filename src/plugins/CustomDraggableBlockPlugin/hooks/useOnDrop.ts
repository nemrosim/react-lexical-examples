import { useCallback, useEffect } from 'react';
import { $getNodeByKey, COMMAND_PRIORITY_HIGH, DROP_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { draggableStore } from '../store';
import { DRAGGABLE_KEY } from '../constants';
import { $createImageNode } from '../../../nodes';

export const useOnDrop = () => {
   const [editor] = useLexicalComposerContext();

   const handleOnDrop = useCallback((dragEvent: DragEvent): boolean => {
      dragEvent.preventDefault();

      const lineElement = draggableStore.getState().line?.htmlElement;

      const closestToLineElementKey = lineElement?.getAttribute(DRAGGABLE_KEY);
      if (!closestToLineElementKey) {
         console.error('[ON DROP] no closestToLineElementKey');
         return false;
      }

      // Handle file drop
      if (dragEvent.dataTransfer?.types.includes('Files')) {
         if (dragEvent.dataTransfer?.items) {
            // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop#process_the_drop
            Array.from(dragEvent.dataTransfer.items).forEach((item) => {
               // If dropped items aren't files, reject them
               if (item.kind === 'file') {
                  const file = item.getAsFile();

                  if (file) {
                     const blob = new Blob([file], { type: file.type });
                     const urlCreator = window.URL || window.webkitURL;
                     let imageUrl = urlCreator.createObjectURL(blob);

                     const image = $createImageNode({
                        altText: 'File',
                        src: imageUrl,
                        maxWidth: 300,
                     });

                     const lineLexicalNode = $getNodeByKey(closestToLineElementKey);
                     lineLexicalNode?.insertAfter(image);
                  }
               }
            });
         }
         return true;
      }
      const draggableElement = draggableStore.getState().draggable?.htmlElement;

      const draggableKey = draggableElement?.getAttribute(DRAGGABLE_KEY);
      if (!draggableKey) {
         console.error('NO DRAGGABLE KEY');
         return false;
      }

      const lineLexicalNode = $getNodeByKey(closestToLineElementKey);

      const draggableLexicalNode = $getNodeByKey(draggableKey);
      if (!draggableLexicalNode) {
         console.error('NO DRAGGABLE ELEMENT FOUND');
         return false;
      }

      // Inserts a node after this LexicalNode (as the next sibling).
      lineLexicalNode?.insertAfter(draggableLexicalNode);

      return true;
   }, []);

   useEffect(() => {
      editor.registerCommand(
         DROP_COMMAND,
         (event) => {
            return handleOnDrop(event);
         },
         COMMAND_PRIORITY_HIGH,
      );
   }, [editor, handleOnDrop]);

   return { handleOnDrop };
};
