import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createTextNode, $getRoot, ElementNode, LexicalNode } from 'lexical';
import { $createCodeNode, $isCodeNode } from '@lexical/code';
import {
   TRANSFORMERS,
   $convertFromMarkdownString,
   $convertToMarkdownString,
   ElementTransformer,
} from '@lexical/markdown';
import { draggableStore } from '../../plugins/CustomDraggableBlockPlugin/store';
import { $createBannerNode, $isBannerNode, BannerNode } from '../../nodes';

const BANNER_TRANSFORMER: ElementTransformer = {
   dependencies: [BannerNode],
   /**
    * This function will we invoked on "node to markdown" action
    */
   export: (node: LexicalNode) => {
      if (!$isBannerNode(node)) {
         // Do nothing if node type is not "banner"
         return null;
      }

      return `-->${node.getTextContent()}`;
   },
   regExp: /-->/,
   /**
    * This function will we invoked on "markdown to node" action
    */
   replace: (parentNode: ElementNode, children: LexicalNode[], match: string[]) => {
      const [allMatch, start, placeholder, end] = match;

      const node = $createBannerNode();
      node.append(...children);
      parentNode.replace(node);
   },
   type: 'element',
};

// Add your custom transformers
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
