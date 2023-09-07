import React from 'react';
import { LexicalEditor } from 'lexical';
import { LexicalNestedComposer } from '@lexical/react/LexicalNestedComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { useImageNodeHandlers } from '@/plugins/ImageWithCaptionPlugin/nodes/components/hooks';

export interface ImageWithCaptionProps {
   lexicalNodeKey: string;
   caption: LexicalEditor;
}

export const ImageWithCaption: React.FC<ImageWithCaptionProps> = (props) => {
   const { isSelected } = useImageNodeHandlers(props);

   return (
      <figure
         className="max-w-lg"
         style={
            isSelected
               ? {
                    border: '2px solid',
                    borderColor: '#235fab',
                    borderRadius: '4px',
                 }
               : {}
         }
      >
         <img
            className="h-auto max-w-full rounded-lg"
            src="https://placehold.co/600x400"
            alt="image description"
         />
         <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
            <LexicalNestedComposer initialEditor={props.caption}>
               {/*TODO: Use share history*/}
               <HistoryPlugin />
               <RichTextPlugin
                  contentEditable={<ContentEditable />}
                  placeholder={() => {
                     return (
                        <div style={{ position: 'relative', top: '-30px' }}>
                           Enter a caption...
                        </div>
                     );
                  }}
                  ErrorBoundary={LexicalErrorBoundary}
               />
            </LexicalNestedComposer>
         </figcaption>
      </figure>
   );
};
