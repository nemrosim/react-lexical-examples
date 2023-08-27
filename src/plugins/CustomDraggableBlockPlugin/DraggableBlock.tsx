import React, { DragEvent as ReactDragEvent, useCallback } from 'react';
import { useDraggableStore } from './store';

import './style.css';

const DraggableBlock: React.FC = () => {
   const { draggable, resetState } = useDraggableStore();

   const handleOnDragStart = useCallback(
      ({ dataTransfer }: ReactDragEvent<HTMLDivElement>) => {
         if (!dataTransfer || !draggable?.htmlElement) {
            return;
         }

         dataTransfer.setDragImage(draggable.htmlElement, 0, 0);
      },
      [draggable?.htmlElement],
   );

   if (!draggable?.data) {
      return null;
   }

   const scrollOffset = document.body.getBoundingClientRect().top;

   return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
         // THIS IS VERY IMPORTANT!!!
         // Without is element will need to be dragged twice;
         draggable={true}
         className="draggable"
         onDragStart={handleOnDragStart}
         onDragEnd={resetState}
         style={{
            top: draggable.data.top - scrollOffset,
            left: (draggable.data.left ?? 0) - 23,
            height: draggable.data.height,
         }}
      />
   );
};

const Memoized = React.memo(DraggableBlock, () => true);

export { Memoized as DraggableBlock };
