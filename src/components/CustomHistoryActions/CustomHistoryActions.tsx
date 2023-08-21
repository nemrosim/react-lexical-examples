import {UNDO_COMMAND, REDO_COMMAND} from 'lexical';
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";

export const CustomHistoryActions = () => {
    const [editor] = useLexicalComposerContext();
    return (
        <>
            <button onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>Undo</button>
            <button onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>Redo</button>
        </>
    );
}