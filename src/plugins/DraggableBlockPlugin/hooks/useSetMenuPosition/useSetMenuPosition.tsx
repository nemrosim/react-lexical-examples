import { useEffect } from 'react';
import { SPACE } from '../useDraggableBlockMenu';

export const useSetMenuPosition = ({
   draggableIconRef,
   draggableBlockElem,
   anchorElem,
}: {
   draggableIconRef: any;
   draggableBlockElem: HTMLElement | null;
   anchorElem: HTMLElement;
}) => {
   const setMenuPosition = (
      targetElem: HTMLElement | null,
      floatingElem: HTMLElement,
      anchorElem: HTMLElement,
   ) => {
      console.log('>>>>>>>>. targetElem', targetElem);
      if (!targetElem) {
         floatingElem.style.opacity = '0';
         floatingElem.style.transform = 'translate(-10000px, -10000px)';
         return;
      }

      const targetRect = targetElem.getBoundingClientRect();
      const targetStyle = window.getComputedStyle(targetElem);
      const floatingElemRect = floatingElem.getBoundingClientRect();
      const anchorElementRect = anchorElem.getBoundingClientRect();

      const lineHeight = parseInt(targetStyle.lineHeight, 10);

      // console.log('>> targetStyle.lineHeight', parseInt(targetStyle.lineHeight, 10));
      // console.log('>> floatingElemRect.height', floatingElemRect.height);

      const top =
         targetRect.top +
         ((isNaN(lineHeight) ? 10 : lineHeight) - floatingElemRect.height) / 2 -
         anchorElementRect.top;

      console.log('top', top);

      const left = SPACE;

      floatingElem.style.opacity = '1';
      floatingElem.style.transform = `translate(${left}px, ${top}px)`;
   };

   useEffect(() => {
      if (draggableIconRef.current) {
         setMenuPosition(draggableBlockElem, draggableIconRef.current, anchorElem);
      }
   }, [anchorElem, draggableBlockElem, draggableIconRef]);
};
