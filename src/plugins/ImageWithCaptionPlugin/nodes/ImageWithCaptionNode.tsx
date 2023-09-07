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
} from 'lexical';
import { JSX } from 'react';
import { ImageWithCaption } from '@/plugins/ImageWithCaptionPlugin/nodes/components';
import { SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';

const NODE_TYPE = 'ImageWithCaptionNode';

export interface SerializedImageWithCaptionNode
   extends SerializedDecoratorBlockNode {
   caption: LexicalEditor;
}

export class ImageWithCaptionNode extends DecoratorNode<JSX.Element> {
   __caption: LexicalEditor;

   constructor(props?: {
      key?: NodeKey;
      caption?: LexicalEditor;
      format: ElementFormatType;
   }) {
      console.log('CONSTRUCTOR');
      super(props?.key);
      this.__caption = props?.caption ?? createEditor();
   }

   static getType(): string {
      return NODE_TYPE;
   }

   static clone(node: ImageWithCaptionNode): ImageWithCaptionNode {
      return new ImageWithCaptionNode({
         key: node.__key,
         format: node.__format,
      });
   }

   // This will be used for JSON export
   exportJSON(): SerializedImageWithCaptionNode {
      return {
         format: this.__format,
         caption: this.__caption,
         type: NODE_TYPE,
         version: 1,
      };
   }

   // This will be used for JSON import ('parse initial state')
   static importJSON(
      serializedNode: SerializedImageWithCaptionNode,
   ): ImageWithCaptionNode {
      console.log('serializedNode', serializedNode);
      const node = $createImageWithCaptionNode();
      return node;
   }

   // Will be called on app start
   static importDOM(): DOMConversionMap | null {
      console.log('IMPORT DOM');
      return {
         div: (node: Node) => ({
            conversion: convertDOMNodeIntoSomething,
            priority: 0,
         }),
      };
   }

   createDOM(config: EditorConfig): HTMLElement {
      const htmlElement = document.createElement('div');
      return htmlElement;
   }

   updateDOM(): false {
      return false;
   }

   setURL(url: string): void {
      const writable = this.getWritable();
      writable.__url = url;
   }

   decorate(_editor: LexicalEditor, config: EditorConfig): JSX.Element {
      console.log('DECORATE', {
         _editor,
         config,
      });
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
   console.log('CONVERT DOM');
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
