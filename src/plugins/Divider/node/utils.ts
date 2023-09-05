import {
   $applyNodeReplacement,
   DOMConversionOutput,
   LexicalNode,
} from 'lexical';
import { DividerNode } from './index';

export const convertDividerElement = (): DOMConversionOutput => {
   return { node: $createDividerNode() };
};

export function $createDividerNode(): DividerNode {
   const divider = new DividerNode();
   console.log('DIVIDER', divider);
   return $applyNodeReplacement(divider);
}

export function $isDividerNode(
   node: LexicalNode | null | undefined,
): node is DividerNode {
   return node instanceof DividerNode;
}
