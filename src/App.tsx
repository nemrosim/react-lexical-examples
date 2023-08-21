import React, {useMemo} from 'react';
import {InitialConfigType, LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {
    OnChangePlugin,
    CustomTextActions,
    CustomHistoryActions
} from "./components";
import initialState from './initialState.json';
import './App.css'

export const App: React.FC = () => {

    const CustomContent = useMemo(() => {
        return (
            <ContentEditable style={{
                position: 'relative',
                borderColor: 'rgba(255,211,2,0.68)',
                border: '2px solid red',
                borderRadius: '5px',
                maxWidth: '100%',
                padding: '10px'
            }}/>
        )
    }, []);

    const CustomPlaceholder = useMemo(() => {
        return (
            <div style={{
                position: 'absolute', top: 31, left: 35, color: '#ffffff'
            }}>
                Enter some text...
            </div>
        )
    }, []);

    const lexicalConfig: InitialConfigType = {
        namespace: 'My Rich Text Editor',
        theme: {
            text: {
                bold: "text-bold",
                italic: "text-italic",
                underline: "text-underline",
                code: 'text-code',
                highlight: 'text-highlight',
                strikethrough: 'text-strikethrough',
                subscript: 'text-subscript',
                superscript: 'text-superscript',
            },
        },
        onError: (e) => {
            console.log('ERROR:', e)
        },
        editorState: JSON.stringify(initialState),
    }

    return (
        <div style={{padding: '20px'}}>
            <LexicalComposer
                initialConfig={lexicalConfig}
            >
                <RichTextPlugin
                    contentEditable={CustomContent}
                    placeholder={CustomPlaceholder}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin/>
                <OnChangePlugin/>
                <div style={{margin: '20px 0px'}}>
                    <CustomHistoryActions/>
                    <CustomTextActions/>
                </div>
            </LexicalComposer>
        </div>
    );
}
