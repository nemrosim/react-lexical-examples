import { DOMConversionOutput, LexicalNode } from 'lexical';
import { YouTubeNode } from '@/plugins/YouTubePlugin/nodes/index';

export function $createYouTubeNode(videoID: string): YouTubeNode {
   return new YouTubeNode(videoID);
}

export function $isYouTubeNode(
   node: YouTubeNode | LexicalNode | null | undefined,
): node is YouTubeNode {
   return node instanceof YouTubeNode;
}

export const convertYoutubeElement = (
   domNode: HTMLElement,
): null | DOMConversionOutput => {
   const videoID = domNode.getAttribute('data-lexical-youtube');
   if (videoID) {
      const node = $createYouTubeNode(videoID);
      return { node };
   }
   return null;
};
