import {
   $getNodeByKey,
   $getSelection,
   $isRangeSelection,
   LexicalEditor,
   RangeSelection,
} from 'lexical';

const getTextUpToAnchor = (selection: RangeSelection): string | null => {
   /**
    * This will get PointType object
    * {
    *    key: "5", <- Node key
    *    offset: 7,
    *    type: "text"
    * }
    */
   const anchor = selection.anchor;

   /**
    * If it is a <span> - true;
    * If it is a <p>, for example, "type" would equal "element"
    */
   if (anchor.type !== 'text') {
      return null;
   }

   // Two approaches with the same result
   const anchorNodeV1 = anchor.getNode();
   const anchorNodeV2 = $getNodeByKey(anchor.key);

   if (!anchorNodeV1.isSimpleText()) {
      return null;
   }

   return anchorNodeV1.getTextContent();
};

export const getNodeTextFromSelection = (editor: LexicalEditor): string | null => {
   return editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) {
         return null;
      }
      return getTextUpToAnchor(selection);
   });
};
