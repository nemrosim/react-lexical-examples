import React, { useRef } from 'react';
import {
   $createParagraphNode,
   $createTextNode,
   $getRoot,
   LexicalEditor,
} from 'lexical';
import { LexicalNestedComposer } from '@lexical/react/LexicalNestedComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { useImageNodeHandlers } from '@/plugins/ImageWithCaptionPlugin/nodes/components/hooks';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import toast from 'react-hot-toast';

import { useSharedHistoryContext } from '../../../../context/SharedHistoryContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { usePopover } from '@/plugins/ImageWithCaptionPlugin/nodes/components/hooks/usePopover/usePopover';
import './styles.css';

export interface ImageWithCaptionProps {
   lexicalNodeKey: string;
   src: string;
   caption: LexicalEditor;
}

export const ImageWithCaption: React.FC<ImageWithCaptionProps> = (props) => {
   const { Popover, setPopoverReference, popoverReferenceProps } =
      usePopover(props);

   const imageRef = useRef<HTMLImageElement | null>(null);
   const { historyState } = useSharedHistoryContext();

   const { isSelected } = useImageNodeHandlers({ ...props, imageRef });

   return (
      <figure className="max-w-lg mb-6">
         <img
            tabIndex={0} // tab index is required for focus effect trigger
            ref={(ref) => {
               imageRef.current = ref;
               setPopoverReference(ref);
            }}
            {...popoverReferenceProps}
            src={props.src}
            className="h-auto max-w-full rounded-lg focus:outline-none focus:ring focus:ring-violet-300"
            alt="image description"
         />
         {Popover}
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
                     editor.update(function restrictLineLengthAndNoNewLine() {
                        const newlinesRegex = /[\n\r]/;

                        const prevTexContent = $getRoot().getTextContent();

                        if (
                           prevTexContent &&
                           (prevTexContent.length > 20 ||
                              newlinesRegex.test(prevTexContent))
                        ) {
                           const newText = prevTexContent.replace(
                              newlinesRegex,
                              '',
                           );

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
