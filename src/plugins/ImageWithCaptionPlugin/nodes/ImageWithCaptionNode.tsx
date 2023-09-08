import {
   createEditor,
   DecoratorNode,
   DOMConversionMap,
   DOMConversionOutput,
   EditorConfig,
   ElementFormatType,
   LexicalEditor,
   LexicalNode,
   NodeKey,
   SerializedEditor,
} from 'lexical';
import { JSX } from 'react';
import { ImageWithCaption } from '@/plugins/ImageWithCaptionPlugin/nodes/components';
import { SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
import { $createImageNode } from '../../../nodes';

const NODE_TYPE = 'ImageWithCaptionNode';

export interface SerializedImageWithCaptionNode
   extends SerializedDecoratorBlockNode {
   caption: SerializedEditor;
   src: string;
}

export class ImageWithCaptionNode extends DecoratorNode<JSX.Element> {
   __caption: LexicalEditor;
   __src: string;

   constructor(props?: {
      key?: NodeKey;
      caption?: LexicalEditor;
      src?: string;
   }) {
      super(props?.key);
      this.__caption = props?.caption || createEditor();
      this.__src = props?.src || 'https://placehold.co/600x400';
   }

   static getType(): string {
      return NODE_TYPE;
   }

   static clone(node: ImageWithCaptionNode): ImageWithCaptionNode {
      return new ImageWithCaptionNode({
         key: node.__key,
         caption: node.__caption,
         src: node.__src,
      });
   }

   // This will be used for JSON export
   exportJSON(): SerializedImageWithCaptionNode {
      return {
         format: this.__format,
         src: this.__src,
         caption: this.__caption.toJSON(),
         type: NODE_TYPE,
         version: 1,
      };
   }

   // This will be used for JSON import ('parse initial state')
   static importJSON(
      serializedNode: SerializedImageWithCaptionNode,
   ): ImageWithCaptionNode {
      const { caption, src } = serializedNode;
      const node = $createImageWithCaptionNode({ src });

      const nestedEditor = node.__caption;
      const editorState = nestedEditor.parseEditorState(caption.editorState);
      if (!editorState.isEmpty()) {
         nestedEditor.setEditorState(editorState);
      }

      return node;
   }

   // TODO: Will be called on app start. Implement later
   // static importDOM(): DOMConversionMap | null {
   //    // convertDOMNodeIntoSomething
   //    return null;
   // }

   createDOM(config: EditorConfig): HTMLElement {
      const htmlElement = document.createElement('div');
      return htmlElement;
   }

   updateDOM(): false {
      return false;
   }

   decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
      return (
         <ImageWithCaption
            lexicalNodeKey={this.__key}
            src={this.__src}
            caption={this.__caption}
         />
      );
   }
}

function convertDOMNodeIntoSomething(
   domNode: Node,
): null | DOMConversionOutput {
   if (domNode instanceof HTMLImageElement) {
      const node = $createImageWithCaptionNode();
      return { node };
   }
   return null;
}

export function $createImageWithCaptionNode(props?: {
   src: string;
}): ImageWithCaptionNode {
   return new ImageWithCaptionNode({ src: props?.src });
}

export function $isImageWithCaptionNode(
   node?: LexicalNode | null,
): node is ImageWithCaptionNode {
   return node instanceof ImageWithCaptionNode;
}
