import { useEffect, useState } from 'react';
import { getBlockElement } from '../../utils/getBlockElement';
import { isHTMLElement } from '../useDraggableBlockMenu';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const DRAGGABLE_BLOCK_MENU_CLASSNAME = 'draggable-block-menu';

function isOnMenu(element: HTMLElement): boolean {
   return !!element.closest(`.${DRAGGABLE_BLOCK_MENU_CLASSNAME}`);
}

export const useDraggableBlockElem = ({ anchorElem }: { anchorElem: HTMLElement }) => {
   const [editor] = useLexicalComposerContext();
   const [draggableBlockElem, setDraggableBlockElem] = useState<HTMLElement | null>(null);

   const scrollerElem = anchorElem.parentElement;

   useEffect(() => {
      function onMouseMove(event: MouseEvent) {
         const target = event.target;
         if (!isHTMLElement(target)) {
            setDraggableBlockElem(null);
            return;
         }

         if (isOnMenu(target)) {
            return;
         }

         const _draggableBlockElem = getBlockElement({ anchorElem, editor, event });

         setDraggableBlockElem(_draggableBlockElem);
      }

      function onMouseLeave() {
         setDraggableBlockElem(null);
      }

      scrollerElem?.addEventListener('mousemove', onMouseMove);
      scrollerElem?.addEventListener('mouseleave', onMouseLeave);

      return () => {
         scrollerElem?.removeEventListener('mousemove', onMouseMove);
         scrollerElem?.removeEventListener('mouseleave', onMouseLeave);
      };
   }, [scrollerElem, anchorElem, editor]);

   const resetDraggableElement = () => {
      setDraggableBlockElem(null);
   };

   return { draggableBlockElem, resetDraggableElement };
};
