import React from 'react';
import {
   $createParagraphNode,
   $createTextNode,
   $getRoot,
   $getSelection,
   LexicalEditor,
} from 'lexical';
import { LexicalNestedComposer } from '@lexical/react/LexicalNestedComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { useImageNodeHandlers } from '@/plugins/ImageWithCaptionPlugin/nodes/components/hooks';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import toast from 'react-hot-toast';

import './styles.css';
import { useSharedHistoryContext } from '../../../../context/SharedHistoryContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

export interface ImageWithCaptionProps {
   lexicalNodeKey: string;
   caption: LexicalEditor;
}

export const ImageWithCaption: React.FC<ImageWithCaptionProps> = (props) => {
   const { historyState } = useSharedHistoryContext();

   const { isSelected } = useImageNodeHandlers(props);

   console.log(
      '[ImageWithCaption] editor state',
      props.caption.getEditorState().toJSON(),
   );

   return (
      <figure className="max-w-lg" style={{}}>
         <img
            className="h-auto max-w-full rounded-lg"
            src="https://placehold.co/600x400"
            alt="image description"
         />
         <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
            <LexicalNestedComposer
               initialEditor={props.caption}
               initialTheme={{
                  root: 'caption-root',
               }}
            >
               <HistoryPlugin externalHistoryState={historyState} />
               <OnChangePlugin
                  onChange={(editorState, editor, tags) => {
                     editor.update(() => {
                        const newlinesRegex = /[\n\r]/;

                        const prevTexContent = $getRoot().getTextContent();

                        console.log('>>>>>>>>> TEXT', `${prevTexContent}`);

                        console.log(
                           '>>>>>>>>>>>>>> IS',
                           prevTexContent?.includes('\r'),
                        );

                        if (
                           prevTexContent &&
                           (prevTexContent.length > 20 ||
                              newlinesRegex.test(prevTexContent))
                        ) {
                           const newText = prevTexContent.replace(
                              newlinesRegex,
                              '',
                           );

                           // replace current content
                           const paragraph = $createParagraphNode();
                           paragraph.append(
                              $createTextNode(
                                 prevTexContent.length > 20
                                    ? prevTexContent.slice(
                                         0,
                                         prevTexContent?.length - 1,
                                      )
                                    : newText,
                              ),
                           );
                           $getRoot().clear().append(paragraph);
                           $getRoot().selectEnd();

                           toast.error('Max length is 20, and no new lines');
                        }
                     });
                  }}
               />
               <PlainTextPlugin
                  contentEditable={<ContentEditable />}
                  placeholder={() => null}
                  ErrorBoundary={LexicalErrorBoundary}
               />
            </LexicalNestedComposer>
         </figcaption>
      </figure>
   );
};
