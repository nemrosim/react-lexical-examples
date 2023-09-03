import { useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import './styles.css';

export function isHtmlElement(node: Node): node is HTMLElement {
   return node instanceof HTMLElement;
}

const TEXT_NODE = 3;

function getCaretPosition(): number {
   if (!(window.getSelection && window.getSelection()?.getRangeAt)) {
      return -1;
   }

   /**
    * Docs:
    * A Selection object represents the range of text selected by the user or the current position of the caret.
    * To obtain a Selection object for examination or manipulation, call window.getSelection().
    */
   const selection: Selection | null = window.getSelection();
   const childNodes = selection?.anchorNode?.parentNode?.childNodes;

   let rangeCount = 0;

   if (!childNodes?.length) {
      return -1;
   }

   if (childNodes?.length) {
      for (let i = 0; i < childNodes.length; i++) {
         if (childNodes[i] == selection?.anchorNode) {
            break;
         }

         const childNode = childNodes[i];

         if (childNode && isHtmlElement(childNode)) {
            if (childNode.outerHTML) {
               const { height } = childNode.getBoundingClientRect();

               let styles = window.getComputedStyle(childNode);
               let margin =
                  parseFloat(styles['marginTop']) +
                  parseFloat(styles['marginBottom']);

               rangeCount += height + margin;

               // nodeType docs: https://developer.mozilla.org/ru/docs/Web/API/Node/nodeType
            } else if (childNode.nodeType == TEXT_NODE) {
               rangeCount += childNode.textContent?.length || 0;
            }
         }
      }
   }

   /**
    * Range docs: https://developer.mozilla.org/en-US/docs/Web/API/Range#%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D1%8B
    */
   let range: Range | undefined = window.getSelection()?.getRangeAt(0);

   const rangeStartOffset = range?.startOffset || 0;

   return rangeStartOffset + rangeCount;
}

// TODO: Complete "FloatingToolbar" implementation
export const FloatingToolbar = () => {
   const divRef = useRef<HTMLDivElement>(null);

   const [caretPosition, setCaretPosition] = useState(0);

   const [editor] = useLexicalComposerContext();

   useEffect(() => {
      const rootElement = editor.getRootElement();

      const keydownCallback = (event: KeyboardEvent) => {
         // Android Chrome browser
         let keyboardCode_Deprecated = event.keyCode || event.which;

         let code = event.code;

         // User pressed "Enter"
         if (
            code === 'Enter' ||
            keyboardCode_Deprecated === 13 ||
            keyboardCode_Deprecated === 223
         ) {
            const caretPosition = getCaretPosition();

            setCaretPosition(caretPosition);

            // Enter keycode
            event.preventDefault();
            return;
         }

         // User pressed "Backspace"
         if (code === 'Backspace' || keyboardCode_Deprecated === 8) {
            const caretPosition = getCaretPosition();

            setCaretPosition(caretPosition);

            event.preventDefault();
            return;
         }
      };

      if (rootElement) {
         rootElement?.addEventListener('keydown', keydownCallback);
      }

      return () => {
         rootElement?.removeEventListener('keydown', keydownCallback);
      };
   }, [editor]);

   return (
      <div
         ref={divRef}
         style={{
            top: caretPosition + 30,
            display: caretPosition ? undefined : 'none',
         }}
         className="floating-text-format-popup"
      >
         Some content
      </div>
   );
};
