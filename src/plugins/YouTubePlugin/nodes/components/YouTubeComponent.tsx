import React from 'react';
import { ElementFormatType, NodeKey } from 'lexical';
import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';

interface YouTubeComponentProps {
   className: Readonly<{
      base: string;
      focus: string;
   }>;
   format: ElementFormatType | null;
   nodeKey: NodeKey;
   videoID: string;
}

export const YouTubeComponent: React.FC<YouTubeComponentProps> = ({
   className,
   format,
   nodeKey,
   videoID,
}: YouTubeComponentProps) => {
   return (
      <BlockWithAlignableContents
         className={className}
         format={format}
         nodeKey={nodeKey}
      >
         <iframe
            style={{
               maxWidth: 560,
               aspectRatio: '16 / 9',
            }}
            width="100%"
            height="auto"
            src={`https://www.youtube-nocookie.com/embed/${videoID}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
            title="YouTube video"
         />
      </BlockWithAlignableContents>
   );
};
