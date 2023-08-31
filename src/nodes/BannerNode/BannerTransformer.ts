import { ElementTransformer } from '@lexical/markdown';
import { BannerNode } from './BannerNode';
import { ElementNode, LexicalNode } from 'lexical';
import { $createBannerNode, $isBannerNode } from './utils';

export const BANNER_TRANSFORMER: ElementTransformer = {
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
