import { $getNodeByKey, $getRoot, LexicalEditor } from 'lexical';

export const getAllLexicalChildren = (editor: LexicalEditor) => {
   const childrenKeys = editor
      .getEditorState()
      .read(() => $getRoot().getChildrenKeys());

   return childrenKeys.map((key) => ({
      key: key,
      node: $getNodeByKey(key),
      htmlElement: editor.getElementByKey(key),
   }));
};
