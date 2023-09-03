import { LexicalEditor, RangeSelection } from 'lexical';
import { getAllLexicalChildren } from '../getAllLexicalChildren';
import { PointType } from 'lexical/LexicalSelection';
import { getNodePlaceholder } from './getNodePlaceholder';

import './styles.css';

const PLACEHOLDER_CLASS_NAME = 'node-placeholder';

const isHtmlHeadingElement = (el: HTMLElement): el is HTMLHeadingElement => {
   return el instanceof HTMLHeadingElement;
};

export const setPlaceholderOnSelection = ({
   selection,
   editor,
}: {
   selection: RangeSelection;
   editor: LexicalEditor;
}): void => {
   /**
    * 1. Get all lexical nodes as HTML elements
    */
   const children = getAllLexicalChildren(editor);

   /**
    * 2. Remove "placeholder" class if it was added before
    */
   children.forEach(({ htmlElement }) => {
      if (!htmlElement) {
         return;
      }

      if (isHtmlHeadingElement(htmlElement)) {
         return;
      }

      const classList = htmlElement.classList;

      if (classList.length && classList.contains(PLACEHOLDER_CLASS_NAME)) {
         classList.remove(PLACEHOLDER_CLASS_NAME);
      }
   });

   /**
    * 3. Do nothing if there is only one lexical child,
    * because we already have a placeholder
    * in <RichTextPlugin/> component
    * With on exception: If we converted default node to the "Heading"
    */
   if (
      children.length === 1 &&
      children[0].htmlElement &&
      !isHtmlHeadingElement(children[0].htmlElement)
   ) {
      return;
   }

   /**
    * 4. Get "PointType" object, that contain Nodes data
    * (that is selected)
    * {
    *    key: "5", <- Node's key
    *    offset: 7,
    *    type: "text"
    * }
    */
   const anchor: PointType = selection.anchor;

   /**
    * 5. Get placeholder for type ('heading'/'paragraph'/etc...)
    */
   const placeholder = getNodePlaceholder(anchor.getNode());

   if (placeholder) {
      const selectedHtmlElement = editor.getElementByKey(anchor.key);

      selectedHtmlElement?.classList.add(PLACEHOLDER_CLASS_NAME);
      selectedHtmlElement?.setAttribute('data-placeholder', placeholder);
   }
};
