import React, { useMemo, useState } from 'react';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import {
   OnChangePlugin,
   CustomTextActions,
   CustomHistoryActions,
   CustomAlignActions,
   CustomHeadingActions,
   CustomHeadingPlugin,
   CustomBannerPlugin,
   CustomBannerActions,
} from './components';
import { HeadingNode } from '@lexical/rich-text';
import initialState from './initialState.json';
import { BannerNode } from './nodes';

import './App.css';
import { DraggableBlockPlugin } from './plugins';

export const App: React.FC = () => {
   const [editableContainerHtmlElement, setEditableContainerHtmlElement] =
      useState<HTMLElement | null>(null);

   const onRef = (divElement: HTMLDivElement) => {
      if (divElement !== null) {
         setEditableContainerHtmlElement(divElement);
      }
   };

   const CustomContent = useMemo(() => {
      return (
         <div
            style={{
               flex: 'auto',
               position: 'relative',
               resize: 'vertical',
               backgroundColor: 'rgba(178,178,178,0.4)',
               maxWidth: '100%',
            }}
            ref={onRef}
         >
            <ContentEditable />
         </div>
      );
   }, []);

   const CustomPlaceholder = useMemo(() => {
      return (
         <div
            style={{
               position: 'absolute',
               top: 31,
               left: 35,
               color: '#ffffff',
            }}
         >
            Enter some text...
         </div>
      );
   }, []);

   const lexicalConfig: InitialConfigType = {
      namespace: 'My Rich Text Editor',
      nodes: [BannerNode, HeadingNode],
      theme: {
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
            <RichTextPlugin
               contentEditable={CustomContent}
               placeholder={CustomPlaceholder}
               ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <OnChangePlugin />
            <CustomHeadingPlugin />
            <CustomBannerPlugin />
            <>
               {editableContainerHtmlElement ? (
                  <DraggableBlockPlugin anchorElem={editableContainerHtmlElement} />
               ) : null}
            </>
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
            </div>
         </LexicalComposer>
      </div>
   );
};
