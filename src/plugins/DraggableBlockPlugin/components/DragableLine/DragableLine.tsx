import React, { forwardRef } from 'react';
import './styles.css';

interface DraggableLineProps {}

export const DraggableLine = forwardRef<HTMLDivElement, DraggableLineProps>((props, ref) => {
   return <div className="draggable-block-target-line" ref={ref} />;
});
DraggableLine.displayName = 'DraggableLine';
