import React from 'react';
import { useDraggableLineStore } from '../store';
import './DraggableLine.css';

const OnDragLine: React.FC = () => {
   const { line } = useDraggableLineStore();

   if (!line?.data) {
      return null;
   }

   const scrollOffset = document.body.getBoundingClientRect().top;

   return (
      <div
         className="on-drag-line"
         style={{
            top: line.data.top + line.data.height - scrollOffset,
            left: line.data.left,
            width: line.data.width,
         }}
      />
   );
};

const Memoized = React.memo(OnDragLine, () => true);

export { Memoized as OnDragLine };
