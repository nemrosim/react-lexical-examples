import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createTextNode, $getRoot } from 'lexical';
import { $createCodeNode, $isCodeNode } from '@lexical/code';
import { $convertFromMarkdownString, $convertToMarkdownString } from '@lexical/markdown';
import { TRANSFORMERS } from '@lexical/markdown';
import { draggableStore } from '../../plugins';
import { BANNER_TRANSFORMER } from '../../nodes';

export const APP_TRANSFORMERS = [...TRANSFORMERS, BANNER_TRANSFORMER];

export const MarkdownActions = () => {
   const [editor] = useLexicalComposerContext();

   const handleOnClick = () => {
      editor.update(() => {
         const root = $getRoot();
         const firstChild = root.getFirstChild();
         if ($isCodeNode(firstChild) && firstChild.getLanguage() === 'markdown') {
            // console.log('Markdown -> Node');

            $convertFromMarkdownString(firstChild.getTextContent(), APP_TRANSFORMERS);
            draggableStore.getState().setIsMarkdown(false);
         } else {
            // console.log('Node -> Markdown');

            const markdown = $convertToMarkdownString(APP_TRANSFORMERS);
            root.clear().append($createCodeNode('markdown').append($createTextNode(markdown)));
            draggableStore.getState().setIsMarkdown(true);
         }
      });
   };

   return (
      <div style={{ marginTop: '10px' }}>
         <span style={{ fontWeight: 'bold' }}>Markdown</span>
         <div>
            <button onClick={handleOnClick}>MARKDOWN</button>
         </div>
      </div>
   );
};
