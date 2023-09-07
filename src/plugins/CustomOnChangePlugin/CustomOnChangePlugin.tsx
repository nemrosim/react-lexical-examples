import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { setNodePlaceholderFromSelection } from '../../utils/lexical';

export const CustomOnChangePlugin = () => {
   const [editor] = useLexicalComposerContext();
   useEffect(() => {
      return editor.registerUpdateListener((listener) => {
         const stateAsJSON = listener.editorState.toJSON();
         console.log('CURRENT STATE', stateAsJSON);
         setNodePlaceholderFromSelection(editor);
      });
   }, [editor]);

   return null;
};
