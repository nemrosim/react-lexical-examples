import React from 'react';
import { useDraggableBlockMenu } from './hooks';
import { createPortal } from 'react-dom';
import { DraggableIcon } from './components/DraggableIcon/DraggableIcon';
import { DraggableLine } from './components/DragableLine/DragableLine';

interface DraggableBlockPluginProps {
   anchorElem: HTMLElement;
}

export const DraggableBlockPlugin: React.FC<DraggableBlockPluginProps> = ({
   anchorElem = document.body,
}) => {
   const { onDragStart, onDragEnd, draggableIconRef, draggableLineRef } =
      useDraggableBlockMenu(anchorElem);

   return createPortal(
      <>
         <DraggableIcon ref={draggableIconRef} onDragStart={onDragStart} onDragEnd={onDragEnd} />
         <DraggableLine ref={draggableLineRef} />
      </>,
      anchorElem,
   );
};
