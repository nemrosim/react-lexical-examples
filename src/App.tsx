import React, { useMemo } from 'react';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import {
   OnChangePlugin,
   CustomTextActions,
   CustomHistoryActions,
   CustomAlignActions,
   CustomHeadingActions,
   CustomHeadingPlugin,
   CustomBannerPlugin,
   CustomBannerActions,
   MarkdownActions,
} from './components';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CodeNode } from '@lexical/code';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { BannerNode, ImageNode } from './nodes';
import { CustomDraggableBlockPlugin, DraggableWrapper } from './plugins';

import initialState from './initialState.json';
import './App.css';

export const App: React.FC = () => {
   const CustomContent = useMemo(() => {
      return (
         <DraggableWrapper>
            <div style={{ position: 'relative' }}>
               <ContentEditable />
            </div>
         </DraggableWrapper>
      );
   }, []);

   const CustomPlaceholder = useMemo(() => {
      return (
         <div
            style={{
               position: 'relative',
               top: -19,
               left: 30,
               color: 'rgba(0,0,0,0.42)',
               zIndex: -10,
               pointerEvents: 'none',
            }}
         >
            Enter some text...
         </div>
      );
   }, []);

   const lexicalConfig: InitialConfigType = {
      namespace: 'My Rich Text Editor',
      nodes: [
         BannerNode,
         HeadingNode,
         ImageNode,
         QuoteNode,
         CodeNode,
         ListNode,
         ListItemNode,
         LinkNode,
      ],
      editable: true,
      theme: {
         root: 'root',
         text: {
            bold: 'text-bold',
            italic: 'text-italic',
            underline: 'text-underline',
            code: 'text-code',
            highlight: 'text-highlight',
            strikethrough: 'text-strikethrough',
            subscript: 'text-subscript',
            superscript: 'text-superscript',
         },
         banner: 'banner',
         code: 'markdown-code',
      },
      onError: (e) => {
         console.log('ERROR:', e);
      },
      editorState: JSON.stringify(initialState),
   };

   return (
      <div
         style={{
            padding: '20px',
         }}
      >
         <LexicalComposer initialConfig={lexicalConfig}>
            <div
               style={{
                  margin: '20px 0px',
               }}
            >
               <CustomHistoryActions />
               <CustomBannerActions />
               <CustomHeadingActions />
               <CustomTextActions />
               <CustomAlignActions />
               <MarkdownActions />
            </div>
            <RichTextPlugin
               contentEditable={CustomContent}
               placeholder={CustomPlaceholder}
               ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <OnChangePlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <CustomHeadingPlugin />
            <CustomBannerPlugin />
            <CustomDraggableBlockPlugin />
         </LexicalComposer>
      </div>
   );
};
