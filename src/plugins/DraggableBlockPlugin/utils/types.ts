import { LexicalEditor } from 'lexical';

export type GetBlockElement = (args: {
   anchorElem: HTMLElement;
   editor: LexicalEditor;
   event: MouseEvent;
   useEdgeAsDefault?: boolean;
}) => HTMLElement | null;
