import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";
import {$getSelection, $isRangeSelection} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import {HeadingTagType, $createHeadingNode } from "@lexical/rich-text";

export const CustomHeadingActions = () => {
    const [editor] = useLexicalComposerContext();

    const handleOnClick =
        (tag: HeadingTagType) => {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createHeadingNode(tag));
                }
            });
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