import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DraggableElement, OnDragLine } from './components';
import { useOnDrop, useDragListeners } from './hooks';
import { createPortal } from 'react-dom';
import { draggableStore } from './store';

export const CustomDraggableBlockPlugin: React.FC = () => {
   const [editor] = useLexicalComposerContext();

   useDragListeners();
   useOnDrop();

   const isEditable = editor.isEditable();

   const wrapperHtmlElement = document.getElementById(DRAGGABLE_WRAPPER_ID);

   if (!isEditable || !wrapperHtmlElement) {
      return null;
   }

   return createPortal(
      <>
         <DraggableElement />
         <OnDragLine />
      </>,
      wrapperHtmlElement,
   );
};

const DRAGGABLE_WRAPPER_ID = 'lexical-draggable-wrapper-id';

/**
 * Reset state on mouse leave
 */
export const DraggableWrapper: React.FC<PropsWithChildren> = ({ children }) => {
   const ref = useRef<HTMLDivElement>(null);

   /**
    * NOTE: onMouseLeave will not work as expected.
    */
   useEffect(() => {
      const callback = () => {
         draggableStore.getState().resetState();
      };

      const current = ref.current;

      current?.addEventListener('mouseleave', callback);

      return () => {
         current?.removeEventListener('mouseleave', callback);
      };
   }, []);

   return (
      <div ref={ref} id={DRAGGABLE_WRAPPER_ID}>
         {children}
      </div>
   );
};
