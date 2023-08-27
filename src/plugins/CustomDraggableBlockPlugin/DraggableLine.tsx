import React from 'react';
import { useDraggableLineStore } from './store/draggableStore';
import './style.css';

const DraggableLine: React.FC = () => {
   const { line } = useDraggableLineStore();

   if (!line?.data) {
      return null;
   }

   const scrollOffset = document.body.getBoundingClientRect().top;

   return (
      <div
         className="line"
         style={{
            top: line.data.top + line.data.height - scrollOffset,
            left: line.data.left,
            width: line.data.width,
         }}
      />
   );
};

const Memoized = React.memo(DraggableLine, () => true);

export { Memoized as DraggableLine };
