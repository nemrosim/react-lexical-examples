import React, { JSX } from 'react';
import type {
   DOMConversionMap,
   DOMExportOutput,
   SerializedLexicalNode,
} from 'lexical';
import { DecoratorNode, EditorConfig, LexicalEditor } from 'lexical';
import { $createDividerNode, convertDividerElement } from './utils';
import { Divider } from './components';

export type SerializedDividerNode = SerializedLexicalNode;

export class DividerNode extends DecoratorNode<JSX.Element> {
   /**
    * Will be called on every editor change/event
    */
   static getType(): string {
      return 'divider';
   }

   static clone(node: DividerNode): DividerNode {
      console.log('[DIVIDER] CLONE');

      return new DividerNode(node.__key);
   }

   static importJSON(serializedNode: SerializedDividerNode): DividerNode {
      return $createDividerNode();
   }

   static importDOM(): DOMConversionMap | null {
      return {
         hr: () => ({
            conversion: convertDividerElement,
            priority: 0,
         }),
      };
   }

   exportJSON(): SerializedLexicalNode {
      return {
         type: 'divider',
         version: 1,
      };
   }

   exportDOM(): DOMExportOutput {
      return { element: document.createElement('br') };
   }

   createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
      const hr = document.createElement('hr');
      hr.className = _config.theme.divider;
      return hr;
   }

   getTextContent(): string {
      return '\n';
   }

   isInline(): false {
      return false;
   }

   updateDOM(): boolean {
      return false;
   }

   decorate(): JSX.Element {
      console.log('DECORATE DIVIDER');
      return <Divider nodeKey={this.__key} />;
   }
}
