import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_NORMAL } from 'lexical';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import {
   $createImageWithCaptionNode,
   ImageWithCaptionNode,
} from '@/plugins/ImageWithCaptionPlugin/nodes/ImageWithCaptionNode';
import { INSERT_IMAGE_WITH_CAPTION_COMMAND } from '@/plugins/ImageWithCaptionPlugin/commands';

export const ImageWithCaptionPlugin: React.FC = () => {
   const [editor] = useLexicalComposerContext();

   if (!editor.hasNode(ImageWithCaptionNode)) {
      throw new Error(
         'ImageWithCaptionNode: "ImageWithCaptionNode" not registered on editor',
      );
   }
   editor.registerCommand(
      INSERT_IMAGE_WITH_CAPTION_COMMAND,
      () => {
         $insertNodeToNearestRoot($createImageWithCaptionNode());
         return true;
      },
      COMMAND_PRIORITY_NORMAL,
   );

   return null;
};
