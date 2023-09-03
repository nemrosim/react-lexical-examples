import { $getRoot, LexicalEditor } from 'lexical';

export const getAllChildrenKeys = (editor: LexicalEditor) => {
   return editor.getEditorState().read(() => $getRoot().getChildrenKeys());
};
