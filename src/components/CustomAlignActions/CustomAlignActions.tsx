import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
   FORMAT_ELEMENT_COMMAND,
   ElementFormatType,
   OUTDENT_CONTENT_COMMAND,
   INDENT_CONTENT_COMMAND,
} from 'lexical';
import { ActionsContainer } from '../ActionsContainer';
import { ActionButton } from '../ActionButton';

export const CustomAlignActions = () => {
   const [editor] = useLexicalComposerContext();

   const handleOnClick =
      ({ formatType }: { formatType: ElementFormatType }) =>
      () => {
         editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, formatType);
      };

   return (
      <ActionsContainer title="Align actions">
         {['Left', 'Center', 'Right', 'Justify'].map((value) => {
            return (
               <ActionButton
                  key={value}
                  onClick={handleOnClick({
                     formatType: value.toLowerCase() as ElementFormatType,
                  })}
               >
                  {value}
               </ActionButton>
            );
         })}
         <ActionButton
            onClick={() =>
               editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)
            }
         >
            Outdent
         </ActionButton>
         <ActionButton
            onClick={() =>
               editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
            }
         >
            Indent
         </ActionButton>
      </ActionsContainer>
   );
};
