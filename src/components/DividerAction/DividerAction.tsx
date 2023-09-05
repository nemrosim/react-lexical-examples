import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ActionsContainer } from '../ActionsContainer';
import { ActionButton } from '../ActionButton';
import { INSERT_DIVIDER_COMMAND } from '@/plugins/Divider/commands';

export const DividerAction = () => {
   const [editor] = useLexicalComposerContext();

   const handleOnClick = () => {
      editor.dispatchCommand(INSERT_DIVIDER_COMMAND, undefined);
   };

   return (
      <ActionsContainer title="Divider action">
         <ActionButton onClick={handleOnClick}>Divider</ActionButton>
      </ActionsContainer>
   );
};
