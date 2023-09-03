import { $getSelection, $isRangeSelection, LexicalEditor } from 'lexical';
import { setPlaceholderOnSelection } from './setPlaceholderOnSelection';

export const setNodePlaceholderFromSelection = (
   editor: LexicalEditor,
): void => {
   editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) {
         // Do nothing if user selected a text fragment
         return;
      }
      setPlaceholderOnSelection({ selection, editor });
   });
};
