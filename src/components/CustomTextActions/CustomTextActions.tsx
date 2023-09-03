import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';
import { ActionsContainer } from '../ActionsContainer';
import { ActionButton } from '../ActionButton';

export const CustomTextActions = () => {
   const [editor] = useLexicalComposerContext();

   const handleOnClick = (formatType: TextFormatType) => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
   };

   return (
      <ActionsContainer title="Text actions">
         {[
            'Bold',
            'Italic',
            'Underline',
            'Code',
            'Highlight',
            'Strikethrough',
            'Subscript',
            'Superscript',
         ].map((value) => {
            return (
               <ActionButton
                  key={value}
                  onClick={() =>
                     handleOnClick(value.toLowerCase() as TextFormatType)
                  }
               >
                  {value}
               </ActionButton>
            );
         })}
      </ActionsContainer>
   );
};
