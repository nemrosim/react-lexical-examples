import React, {useMemo} from 'react';
import {InitialConfigType, LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from "@lexical/react/LexicalPlainTextPlugin";
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {CustomHistoryActions} from "./components";

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
                position: 'absolute', top: 30, left: 30,
            }}>
                Enter some text...
            </div>
        )
    }, []);

    const lexicalConfig: InitialConfigType = {
        namespace: 'My Rich Text Editor',
        onError: (e) => {
            console.log('ERROR:', e)
        }
    }

    return (
        <div style={{padding: '20px'}}>
            <LexicalComposer initialConfig={lexicalConfig}>
                <PlainTextPlugin
                    contentEditable={CustomContent}
                    placeholder={CustomPlaceholder}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin/>
                <div style={{margin: '20px 0px'}}>
                    <CustomHistoryActions/>
                </div>
            </LexicalComposer>

        </div>
    );
}
