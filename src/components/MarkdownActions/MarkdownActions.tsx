import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createTextNode, $getRoot } from 'lexical';
import { $createCodeNode, $isCodeNode } from '@lexical/code';
import {
   $convertFromMarkdownString,
   $convertToMarkdownString,
} from '@lexical/markdown';
import { TRANSFORMERS } from '@lexical/markdown';
import { draggableStore, BANNER_TRANSFORMER } from '../../plugins';
import { ActionsContainer } from '../ActionsContainer';
import { ActionButton } from '../ActionButton';

export const APP_TRANSFORMERS = [
   ...TRANSFORMERS,
   // TODO: Regex work in one line in lexical,
   // so transformer works not as expected
   BANNER_TRANSFORMER,
];

export const MarkdownActions = () => {
   const [editor] = useLexicalComposerContext();

   const handleOnClick = () => {
      editor.update(() => {
         const root = $getRoot();
         const firstChild = root.getFirstChild();
         if (
            $isCodeNode(firstChild) &&
            firstChild.getLanguage() === 'markdown'
         ) {
            $convertFromMarkdownString(
               firstChild.getTextContent(),
               APP_TRANSFORMERS,
            );
            draggableStore.getState().setIsMarkdown(false);
         } else {
            const markdown = $convertToMarkdownString(APP_TRANSFORMERS);
            root
               .clear()
               .append(
                  $createCodeNode('markdown').append($createTextNode(markdown)),
               );
            draggableStore.getState().setIsMarkdown(true);
         }
      });
   };

   return (
      <ActionsContainer title="Markdown action">
         <ActionButton onClick={handleOnClick}>Markdown 🤦‍♂️</ActionButton>
      </ActionsContainer>
   );
};
