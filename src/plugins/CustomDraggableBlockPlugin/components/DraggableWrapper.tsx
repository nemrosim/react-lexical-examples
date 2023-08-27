import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { draggableStore } from '../store';

export const DRAGGABLE_WRAPPER_ID = 'lexical-draggable-wrapper-id';

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
