import { BannerNode } from './BannerNode';
import { LexicalNode } from 'lexical';

export const $createBannerNode = (): BannerNode => new BannerNode();

export function $isBannerNode(node: LexicalNode | null | undefined): node is BannerNode {
   return node instanceof BannerNode;
}
