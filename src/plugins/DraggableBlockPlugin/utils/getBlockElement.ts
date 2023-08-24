import { $getRoot, LexicalEditor } from 'lexical';
import { Point } from '../Point';
import { Rect } from '../Rect';
import { getCollapsedMargins } from './getCollapsedMargins';
import { GetBlockElement } from './types';

function getTopLevelNodeKeys(editor: LexicalEditor): string[] {
   return editor.getEditorState().read(() => $getRoot().getChildrenKeys());
}

let prevIndex = Infinity;

function getCurrentIndex(keysLength: number): number {
   if (keysLength === 0) {
      return Infinity;
   }
   if (prevIndex >= 0 && prevIndex < keysLength) {
      return prevIndex;
   }

   return Math.floor(keysLength / 2);
}

const Downward = 1;
const Upward = -1;
const Indeterminate = 0;

export const getBlockElement: GetBlockElement = ({
   anchorElem,
   editor,
   event,
   useEdgeAsDefault = false,
}) => {
   const anchorElementRect = anchorElem.getBoundingClientRect();
   const topLevelNodeKeys = getTopLevelNodeKeys(editor);

   let blockElem: HTMLElement | null = null;

   editor.getEditorState().read(() => {
      if (useEdgeAsDefault) {
         const [firstNode, lastNode] = [
            editor.getElementByKey(topLevelNodeKeys[0]),
            editor.getElementByKey(topLevelNodeKeys[topLevelNodeKeys.length - 1]),
         ];

         const [firstNodeRect, lastNodeRect] = [
            firstNode?.getBoundingClientRect(),
            lastNode?.getBoundingClientRect(),
         ];

         if (firstNodeRect && lastNodeRect) {
            if (event.y < firstNodeRect.top) {
               blockElem = firstNode;
            } else if (event.y > lastNodeRect.bottom) {
               blockElem = lastNode;
            }

            if (blockElem) {
               return;
            }
         }
      }

      let index = getCurrentIndex(topLevelNodeKeys.length);
      let direction = Indeterminate;

      while (index >= 0 && index < topLevelNodeKeys.length) {
         const key = topLevelNodeKeys[index];
         const elem = editor.getElementByKey(key);
         if (elem === null) {
            break;
         }
         const point = new Point(event.x, event.y);
         const domRect = Rect.fromDOM(elem);
         const { marginTop, marginBottom } = getCollapsedMargins(elem);

         console.log('anchorElementRect.left', anchorElementRect.left);
         console.log('anchorElementRect.top', anchorElementRect.top);

         const rect = domRect.generateNewRect({
            bottom: domRect.bottom + marginBottom,
            left: anchorElementRect.left,
            right: anchorElementRect.right,
            top: domRect.top - marginTop,
         });

         const {
            result,
            reason: { isOnTopSide, isOnBottomSide },
         } = rect.contains(point);

         if (result) {
            blockElem = elem;
            prevIndex = index;
            break;
         }

         if (direction === Indeterminate) {
            if (isOnTopSide) {
               direction = Upward;
            } else if (isOnBottomSide) {
               direction = Downward;
            } else {
               // stop search block element
               direction = Infinity;
            }
         }

         index += direction;
      }
   });

   return blockElem;
};
