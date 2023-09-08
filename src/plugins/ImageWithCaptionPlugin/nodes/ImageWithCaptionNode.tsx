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
}

export class ImageWithCaptionNode extends DecoratorNode<JSX.Element> {
   __caption: LexicalEditor;

   constructor(props?: { key?: NodeKey; caption?: LexicalEditor }) {
      console.log('[ImageWithCaptionNode] 1. CONSTRUCTOR', props);
      super(props?.key);
      this.__caption = props?.caption || createEditor();
   }

   static getType(): string {
      console.log('[ImageWithCaptionNode] 1. getType');

      return NODE_TYPE;
   }

   static clone(node: ImageWithCaptionNode): ImageWithCaptionNode {
      console.log('[ImageWithCaptionNode]. clone');
      return new ImageWithCaptionNode({
         key: node.__key,
         caption: node.__caption,
      });
   }

   // This will be used for JSON export
   exportJSON(): SerializedImageWithCaptionNode {
      console.log('[ImageWithCaptionNode]. exportJSON');

      return {
         format: this.__format,
         caption: this.__caption.toJSON(),
         type: NODE_TYPE,
         version: 1,
      };
   }

   // This will be used for JSON import ('parse initial state')
   static importJSON(
      serializedNode: SerializedImageWithCaptionNode,
   ): ImageWithCaptionNode {
      console.log('[ImageWithCaptionNode]. importJSON');

      const { caption } = serializedNode;
      const node = $createImageWithCaptionNode();

      const nestedEditor = node.__caption;
      const editorState = nestedEditor.parseEditorState(caption.editorState);
      if (!editorState.isEmpty()) {
         nestedEditor.setEditorState(editorState);
      }

      return node;
   }

   // Will be called on app start
   static importDOM(): DOMConversionMap | null {
      console.log('[ImageWithCaptionNode]. importDOM');

      return null;
   }

   createDOM(config: EditorConfig): HTMLElement {
      const htmlElement = document.createElement('div');
      return htmlElement;
   }

   updateDOM(): false {
      return false;
   }

   decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
      console.log('DECORATE', this.__caption.getEditorState().toJSON());
      return (
         <ImageWithCaption
            lexicalNodeKey={this.__key}
            caption={this.__caption}
         />
      );
   }
}

function convertDOMNodeIntoSomething(
   domNode: Node,
): null | DOMConversionOutput {
   console.log('CONVERT DOM', domNode);
   if (domNode instanceof HTMLImageElement) {
      const node = $createImageWithCaptionNode();
      return { node };
   }
   return null;
}

export function $createImageWithCaptionNode(): ImageWithCaptionNode {
   return new ImageWithCaptionNode();
}

export function $isImageWithCaptionNode(
   node?: LexicalNode | null,
): node is ImageWithCaptionNode {
   return node instanceof ImageWithCaptionNode;
}
