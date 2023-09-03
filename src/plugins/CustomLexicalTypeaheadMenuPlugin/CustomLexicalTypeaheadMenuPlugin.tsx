import React from 'react';
import { LexicalTypeaheadMenuPlugin } from '@lexical/react/LexicalTypeaheadMenuPlugin';

export const CustomLexicalTypeaheadMenuPlugin = () => {
   return null;
   // TODO: Complete "CustomLexicalTypeaheadMenuPlugin" implementation
   // return (
   //    <LexicalTypeaheadMenuPlugin
   //       onQueryChange={(matchingString: string | null) => {
   //          console.log('>>>> HELLO', matchingString);
   //       }}
   //       triggerFn={(text: string) => {
   //          return {
   //             leadOffset: 100,
   //             matchingString: '/',
   //             replaceableString: '',
   //          };
   //       }}
   //       menuRenderFn={(
   //          anchorElementRef,
   //          { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex },
   //       ) => {
   //          if (true) {
   //             return <div style={{ backgroundColor: 'red', width: 300, height: 300 }}></div>;
   //          }
   //
   //          return null;
   //       }}
   //    />
   // );
};
