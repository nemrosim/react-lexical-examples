import React, { forwardRef } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import './styles.css';

interface DraggableIconProps {
   onDragStart: React.DragEventHandler<HTMLDivElement>;
   onDragEnd: React.DragEventHandler<HTMLDivElement>;
}

export const DraggableIcon = forwardRef<HTMLDivElement, DraggableIconProps>(
   ({ onDragStart, onDragEnd }, ref) => {
      const [editor] = useLexicalComposerContext();

      const isEditable = editor.isEditable();

      return (
         // eslint-disable-next-line jsx-a11y/no-static-element-interactions
         <div
            id="draggable-block-id" // TODO:remove
            className="icon draggable-block-menu"
            ref={ref}
            draggable={true}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
         >
            <div className={isEditable ? 'icon' : ''} />
         </div>
      );
   },
);
DraggableIcon.displayName = 'DraggableIcon';
