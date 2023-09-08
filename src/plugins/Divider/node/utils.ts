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
   return $applyNodeReplacement(divider);
}

export function $isDividerNode(
   node: LexicalNode | null | undefined,
): node is DividerNode {
   return node instanceof DividerNode;
}
