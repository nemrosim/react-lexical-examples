import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useOnDragEnter } from './useOnDragEnter';
import { useEffect } from 'react';
import { draggableStore } from '../../store';
import { DRAGGABLE_KEY } from '../../constants';
import { useEditorKeys } from './useEditorKeys';
import { $getNodeByKey, $getRoot, COMMAND_PRIORITY_LOW, DRAGOVER_COMMAND } from 'lexical';
import { isInstanceOfHTMLElement } from '../../utils';
import './useDragListeners.css';

const setDraggableElement = ({ target }: MouseEvent) => {
   if (!isInstanceOfHTMLElement(target)) {
      console.warn('[callback] target is not HTMLElement');
      return;
   }

   const coordinates = target.getBoundingClientRect();

   draggableStore.getState().setDraggable({
      htmlElement: target,
      data: {
         top: coordinates.top,
         left: coordinates.left,
         height: coordinates.height,
      },
   });
};

export const useDragListeners = () => {
   const [editor] = useLexicalComposerContext();
   const { handleOnDragEnter } = useOnDragEnter();

   const { keys } = useEditorKeys();

   useEffect(() => {
      const addListeners = () => {
         keys.forEach((key) => {
            // 1. We need to set listener only to nodes
            const htmlElement = editor.getElementByKey(key);

            if (!htmlElement) {
               console.warn('[useDragListeners] No html element');
               return;
            }

            // TODO: JUST FOR VISUALIZATION! You can remove it!
            htmlElement.classList.add('draggable-block');

            htmlElement.setAttribute(DRAGGABLE_KEY, key);

            // NOTE: Don't use "mouseover"/"mousemove" because then it will be triggered on children too!
            htmlElement.addEventListener('mouseenter', setDraggableElement);

            // We need "dragenter" with "DRAGOVER_COMMAND" because:
            // 1. target on "dragenter" -> current html element;
            // 2. target on "DRAGOVER_COMMAND" -> editable container;
            // 3. without "DRAGOVER_COMMAND" -> "DROP_COMMAND" will not work;
            htmlElement.addEventListener('dragenter', handleOnDragEnter);
         });
      };

      addListeners();

      const removeListeners = () => {
         keys.forEach((key) => {
            const htmlElement = editor.getElementByKey(key);

            if (!htmlElement) {
               console.warn('[useDragListeners] No html element');
               return;
            }

            htmlElement.removeEventListener('mouseenter', setDraggableElement);
            htmlElement.removeEventListener('dragenter', handleOnDragEnter);
         });
      };

      return () => {
         removeListeners();
      };
   }, [editor, handleOnDragEnter, keys]);

   useEffect(() => {
      // We need to register for drop to work with "dragenter" event
      // Without overriding this command "DROP_COMMAND" will not be triggered
      editor.registerCommand(
         DRAGOVER_COMMAND,
         (event) => handleOnDragEnter(event),
         COMMAND_PRIORITY_LOW,
      );
   }, [editor, handleOnDragEnter]);
};
