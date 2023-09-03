import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HeadingTagType } from '@lexical/rich-text';
import { FORMAT_HEADING_COMMAND } from '../../plugins';
import { ActionsContainer } from '../ActionsContainer';
import { ActionButton } from '../ActionButton';

export const CustomHeadingActions = () => {
   const [editor] = useLexicalComposerContext();

   const handleOnClick = (tag: HeadingTagType) => {
      editor.dispatchCommand(FORMAT_HEADING_COMMAND, tag);
   };

   return (
      <ActionsContainer title="Heading actions">
         {(['h1', 'h2', 'h3', 'h4', 'h5'] as Array<HeadingTagType>).map(
            (tag) => {
               return (
                  <ActionButton key={tag} onClick={() => handleOnClick(tag)}>
                     {tag}
                  </ActionButton>
               );
            },
         )}
      </ActionsContainer>
   );
};
