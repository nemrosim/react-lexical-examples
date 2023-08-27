import { draggableStore } from '../../store';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DRAGGABLE_KEY } from '../../constants';
import { useCallback } from 'react';
import { isInstanceOfHTMLElement } from '../../utils';

export const useOnDragEnter = () => {
   const [editor] = useLexicalComposerContext();

   const handleOnDragEnter = useCallback(
      (event: DragEvent): boolean => {
         // Without this drop will not work;
         event.preventDefault();

         /*
            NOTE: Don't use event.target
            because dragEnter will be triggered on a children too
         */
         const target = event.currentTarget;

         if (!isInstanceOfHTMLElement(target)) {
            console.error('[On drag enter] CurrentTarget is not Html element');
            return false;
         }

         // Use value that we set before.
         const key = target.getAttribute(DRAGGABLE_KEY);

         //
         if (!key) {
            return false;
         } else {
            console.log(`Lexical node key is ${key}`);
         }

         const element = editor.getElementByKey(key);

         if (!isInstanceOfHTMLElement(element)) {
            console.error('[handleOnDragEnter] element is not HTMLElement');
            return false;
         }

         const coordinates = element.getBoundingClientRect();

         if (coordinates) {
            draggableStore.getState().setLine({
               htmlElement: element,
               data: {
                  top: coordinates.top,
                  left: coordinates.left,
                  height: coordinates.height,
                  width: coordinates.width,
               },
            });
         }

         return true;
      },
      [editor],
   );

   return { handleOnDragEnter };
};
