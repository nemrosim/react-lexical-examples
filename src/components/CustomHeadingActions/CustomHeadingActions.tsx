import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";
import {HeadingTagType} from "@lexical/rich-text";
import {FORMAT_HEADING_COMMAND} from "../CustomHeadingPlugin";

export const CustomHeadingActions = () => {
    const [editor] = useLexicalComposerContext();

    const handleOnClick = (tag: HeadingTagType) => {
        editor.dispatchCommand(FORMAT_HEADING_COMMAND, tag);
    };

    return (
        <div style={{marginTop: '10px'}}>
            <span style={{fontWeight: 'bold'}}>Heading actions</span>
            <div>
                {(["h1", "h2", "h3", "h4", "h5"] as Array<HeadingTagType>).map((tag) => {
                    return (
                        <button
                            key={tag}
                            onClick={() => handleOnClick(tag)}
                        >
                            {tag}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}