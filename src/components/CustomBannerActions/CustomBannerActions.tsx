import React from "react";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {INSERT_BANNER_COMMAND} from "../CustomBannerPlugin";

export const CustomBannerActions: React.FC = () => {
    const [editor] = useLexicalComposerContext();

    const handleOnClick = () => {
        editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined);
    };

    return (
        <div style={{marginTop: '10px'}}>
            <span style={{fontWeight: 'bold'}}>Heading actions</span>
            <div>
                <button onClick={handleOnClick}>
                    Banner
                </button>
            </div>
        </div>
    );
};