import { createPortal } from 'react-dom';
import React, { useEffect, useRef } from 'react';
import { useModalContext } from '@/components/Modal/context';
import toast from 'react-hot-toast';

export const Modal: React.FC = () => {
   const preRef = useRef<HTMLPreElement>(null);
   const { isVisible, content, closeModal } = useModalContext();

   useEffect(() => {
      const preHtmlElement = preRef.current;

      const eventHandler = async (event: KeyboardEvent) => {
         if (event.key === 'a' && event.metaKey) {
            event?.preventDefault();

            let sel = window.getSelection();
            let range = document.createRange();
            range.selectNodeContents(preHtmlElement?.firstChild as any);
            sel?.removeAllRanges();
            sel?.addRange(range);

            await navigator.clipboard.writeText(content);

            toast.success('Data copied to clipboard');
         }
         return true;
      };

      if (isVisible && preHtmlElement) {
         preHtmlElement.addEventListener('keydown', eventHandler, true);
      }

      return () => {
         preHtmlElement?.removeEventListener('keydown', eventHandler, true);
      };
   }, [content, isVisible]);

   return createPortal(
      <div
         id="modal"
         onClick={closeModal}
         style={{
            top: 0,
            left: 0,
            zIndex: 100,
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: isVisible ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <div
            onClick={(e) => e.stopPropagation()}
            style={{
               position: 'relative',
               zIndex: 101,
               backgroundColor: 'whitesmoke',
               padding: '8px',
               width: '80%',
               height: '80%',
               overflow: 'auto',
            }}
         >
            <pre tabIndex={0} ref={preRef}>
               {content}
            </pre>
         </div>
      </div>,
      document?.body,
   );
};
