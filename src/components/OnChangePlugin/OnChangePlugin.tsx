import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useEffect} from "react";

export const OnChangePlugin = () => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerUpdateListener((listener) => {
            console.log('DATA', listener.editorState.toJSON())
        });
    }, [editor]);

    return null;
}