import {
   $getNearestNodeFromDOMNode,
   $getNodeByKey,
   COMMAND_PRIORITY_HIGH,
   COMMAND_PRIORITY_LOW,
   DRAGOVER_COMMAND,
   DROP_COMMAND,
} from 'lexical';
import { useEffect, useRef, DragEvent as ReactDragEvent } from 'react';
import { eventFiles } from '@lexical/rich-text';
import { mergeRegister } from '@lexical/utils';
import { useDraggableBlockElem } from './useDraggableBlockElem/useDraggableBlockElem';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { getBlockElement } from '../utils/getBlockElement';
import { getCollapsedMargins } from '../utils/getCollapsedMargins';
import { useSetMenuPosition } from './useSetMenuPosition';

export const SPACE = 4;
const TARGET_LINE_HALF_HEIGHT = 2;
const DRAG_DATA_FORMAT = 'application/x-lexical-drag-block';
const TEXT_BOX_HORIZONTAL_PADDING = 28;

export function isHTMLElement(x: unknown): x is HTMLElement {
   return x instanceof HTMLElement;
}

function setTargetLine(
   targetLineElem: HTMLElement,
   targetBlockElem: HTMLElement,
   mouseY: number,
   anchorElem: HTMLElement,
) {
   const { top: targetBlockElemTop, height: targetBlockElemHeight } =
      targetBlockElem.getBoundingClientRect();
   const { top: anchorTop, width: anchorWidth } = anchorElem.getBoundingClientRect();

   const { marginTop, marginBottom } = getCollapsedMargins(targetBlockElem);
   let lineTop = targetBlockElemTop;
   if (mouseY >= targetBlockElemTop) {
      lineTop += targetBlockElemHeight + marginBottom / 2;
   } else {
      lineTop -= marginTop / 2;
   }

   const top = lineTop - anchorTop - TARGET_LINE_HALF_HEIGHT;
   const left = TEXT_BOX_HORIZONTAL_PADDING - SPACE;

   targetLineElem.style.transform = `translate(${left}px, ${top}px)`;
   targetLineElem.style.width = `${anchorWidth - (TEXT_BOX_HORIZONTAL_PADDING - SPACE) * 2}px`;
   targetLineElem.style.opacity = '.4';
}

function setDragImage(dataTransfer: DataTransfer, draggableBlockElem: HTMLElement) {
   const { transform } = draggableBlockElem.style;

   // Remove dragImage borders
   draggableBlockElem.style.transform = 'translateZ(0)';
   dataTransfer.setDragImage(draggableBlockElem, 0, 0);

   setTimeout(() => {
      draggableBlockElem.style.transform = transform;
   });
}

function hideTargetLine(targetLineElem: HTMLElement | null) {
   if (targetLineElem) {
      targetLineElem.style.opacity = '0';
      targetLineElem.style.transform = 'translate(-10000px, -10000px)';
   }
}

export const useDraggableBlockMenu = (anchorElem: HTMLElement) => {
   const [editor] = useLexicalComposerContext();

   // 1. Get hovered element
   const { draggableBlockElem, resetDraggableElement } = useDraggableBlockElem({ anchorElem });

   const draggableIconRef = useRef<HTMLDivElement>(null);

   useSetMenuPosition({
      draggableBlockElem,
      draggableIconRef,
      anchorElem,
   });

   const draggableLineRef = useRef<HTMLDivElement>(null);

   const isDraggingBlockRef = useRef<boolean>(false);

   useEffect(() => {
      function onDragover(event: DragEvent): boolean {
         if (!isDraggingBlockRef.current) {
            return false;
         }
         const [isFileTransfer] = eventFiles(event);
         if (isFileTransfer) {
            return false;
         }
         const { pageY, target } = event;
         if (!isHTMLElement(target)) {
            return false;
         }
         const targetBlockElem = getBlockElement({
            anchorElem,
            editor,
            event,
            useEdgeAsDefault: true,
         });
         const targetLineElem = draggableLineRef.current;
         if (targetBlockElem === null || targetLineElem === null) {
            return false;
         }
         setTargetLine(targetLineElem, targetBlockElem, pageY, anchorElem);
         // Prevent default event to be able to trigger onDrop events
         event.preventDefault();
         return true;
      }

      function onDrop(event: DragEvent): boolean {
         if (!isDraggingBlockRef.current) {
            return false;
         }
         const [isFileTransfer] = eventFiles(event);
         if (isFileTransfer) {
            return false;
         }
         const { target, dataTransfer, pageY } = event;
         const dragData = dataTransfer?.getData(DRAG_DATA_FORMAT) || '';
         const draggedNode = $getNodeByKey(dragData);
         if (!draggedNode) {
            return false;
         }
         if (!isHTMLElement(target)) {
            return false;
         }
         const targetBlockElem = getBlockElement({
            anchorElem,
            editor,
            event,
            useEdgeAsDefault: true,
         });
         if (!targetBlockElem) {
            return false;
         }
         const targetNode = $getNearestNodeFromDOMNode(targetBlockElem);
         if (!targetNode) {
            return false;
         }
         if (targetNode === draggedNode) {
            return true;
         }
         const targetBlockElemTop = targetBlockElem.getBoundingClientRect().top;
         if (pageY >= targetBlockElemTop) {
            targetNode.insertAfter(draggedNode);
         } else {
            targetNode.insertBefore(draggedNode);
         }
         resetDraggableElement();

         return true;
      }

      return mergeRegister(
         editor.registerCommand(
            DRAGOVER_COMMAND,
            (event) => {
               return onDragover(event);
            },
            COMMAND_PRIORITY_LOW,
         ),
         editor.registerCommand(
            DROP_COMMAND,
            (event) => {
               return onDrop(event);
            },
            COMMAND_PRIORITY_HIGH,
         ),
      );
   }, [anchorElem, editor, resetDraggableElement]);

   function onDragStart(event: ReactDragEvent<HTMLDivElement>): void {
      const dataTransfer = event.dataTransfer;
      console.log('dataTransfer', dataTransfer);
      if (!dataTransfer || !draggableBlockElem) {
         return;
      }
      setDragImage(dataTransfer, draggableBlockElem);
      let nodeKey = '';
      editor.update(() => {
         const node = $getNearestNodeFromDOMNode(draggableBlockElem);
         if (node) {
            nodeKey = node.getKey();
         }
      });
      isDraggingBlockRef.current = true;
      dataTransfer.setData(DRAG_DATA_FORMAT, nodeKey);
   }

   function onDragEnd(): void {
      isDraggingBlockRef.current = false;
      hideTargetLine(draggableLineRef.current);
   }

   return { onDragStart, onDragEnd, draggableIconRef, draggableLineRef };
};
