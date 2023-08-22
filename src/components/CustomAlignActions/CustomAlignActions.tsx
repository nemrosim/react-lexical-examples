import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";
import {
    FORMAT_ELEMENT_COMMAND,
    ElementFormatType,
    OUTDENT_CONTENT_COMMAND,
    INDENT_CONTENT_COMMAND
} from 'lexical';

export const CustomAlignActions = () => {
    const [editor] = useLexicalComposerContext();

    const handleOnClick = (formatType: ElementFormatType) => {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, formatType)
    }

    return (
        <div style={{marginTop: '10px'}}>
            <span style={{fontWeight: 'bold'}}>Heading actions</span>
            <div>
                {[
                    'Left',
                    'Center',
                    'Right',
                    'Justify',
                ].map(value => {
                    return (
                        <button
                            onClick={() => handleOnClick(value.toLowerCase() as ElementFormatType)}>
                            {value}
                        </button>
                    )
                })}
                <button
                    onClick={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)}>
                    Outdent
                </button>
                <button
                    onClick={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)}>
                    Indent
                </button>
            </div>
        </div>
    );
}