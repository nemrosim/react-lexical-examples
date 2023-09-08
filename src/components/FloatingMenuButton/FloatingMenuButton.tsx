import { TfiExport } from 'react-icons/tfi';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EditorState, LexicalEditor } from 'lexical';
import { BsFiletypeJson } from 'react-icons/bs';
import { useModalContext } from '@/components/Modal/context';

type DocumentJSON = {
   editorState: EditorState;
   lastSaved: number;
   source: string | 'Lexical';
};

// Adapted from https://stackoverflow.com/a/19328891/2013580
function exportBlob(data: DocumentJSON, fileName: string) {
   const a = document.createElement('a');
   const body = document.body;

   if (body === null) {
      return;
   }

   body.appendChild(a);
   a.style.display = 'none';
   const json = JSON.stringify(data);
   const blob = new Blob([json], {
      type: 'octet/stream',
   });
   const url = window.URL.createObjectURL(blob);
   a.href = url;
   a.download = fileName;
   a.click();
   window.URL.revokeObjectURL(url);
   a.remove();
}

export function exportFile(
   editor: LexicalEditor,
   config: Readonly<{
      fileName?: string;
      source?: string;
   }> = Object.freeze({}),
) {
   const now = new Date();
   const editorState = editor.getEditorState();
   const documentJSON: DocumentJSON = {
      editorState: editorState,
      lastSaved: now.getTime(),
      source: config.source || 'Lexical',
   };
   const fileName = config.fileName || now.toISOString();
   exportBlob(documentJSON, `${fileName}.json`);
}

const ICON_SIZE = 25;

export const FloatingMenuButton = () => {
   const { openModal } = useModalContext();
   const [editor] = useLexicalComposerContext();

   return (
      <>
         <div className="fixed bottom-6 right-6 group">
            <button
               type="button"
               onClick={() =>
                  exportFile(editor, {
                     fileName: `Playground ${new Date().toISOString()}`,
                     source: 'Playground',
                  })
               }
               data-dial-toggle="speed-dial-menu-text-outside-button-square"
               aria-controls="speed-dial-menu-text-outside-button-square"
               aria-expanded="false"
               className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            >
               <TfiExport style={{ width: ICON_SIZE, height: ICON_SIZE }} />
               <span className="sr-only">Open actions menu</span>
            </button>
         </div>
         <div className="fixed bottom-6 right-24 group">
            <button
               type="button"
               onClick={() =>
                  openModal(
                     JSON.stringify(editor.getEditorState().toJSON(), null, 2),
                  )
               }
               data-dial-toggle="speed-dial-menu-text-outside-button-square"
               aria-controls="speed-dial-menu-text-outside-button-square"
               aria-expanded="false"
               className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            >
               <BsFiletypeJson
                  style={{ width: ICON_SIZE, height: ICON_SIZE }}
               />
               <span className="sr-only">Open actions menu</span>
            </button>
         </div>
      </>
   );
};
