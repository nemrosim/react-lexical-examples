import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";
import {HeadingTagType} from "@lexical/rich-text";

export const CustomHeadingActions = () => {
    const [editor] = useLexicalComposerContext();

    const handleOnClick =
        (tag: HeadingTagType) => {
            editor.update(() => {
                // Do something
            });
        };

    return (
        <div style={{marginTop: '10px'}}>
            <span style={{fontWeight: 'bold'}}>Align actions</span>
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