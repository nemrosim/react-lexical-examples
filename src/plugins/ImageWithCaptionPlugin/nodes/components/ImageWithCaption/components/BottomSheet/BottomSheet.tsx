import React from 'react';
import {
   BsArrowDownCircle,
   BsChatLeftText,
   BsGlobe2,
   BsLink45Deg,
   BsTrash3,
} from 'react-icons/bs';
import { HiOutlineDuplicate } from 'react-icons/hi';
import { FiArrowDown } from 'react-icons/fi';
import { BottomSheet as SpringBottomSheet } from 'react-spring-bottom-sheet';
import { Header, ListBlock, ListItem } from './components';

import { BiZoomIn } from 'react-icons/bi';
import { HiArrowUpRight } from 'react-icons/hi2';
import { PiArrowElbowUpRightBold, PiArrowsClockwise } from 'react-icons/pi';
import { TbTextCaption } from 'react-icons/tb';
import { LuAlignVerticalSpaceAround } from 'react-icons/lu';
import { ImageWithCaptionProps } from '@/plugins/ImageWithCaptionPlugin/nodes/components';
import toast from 'react-hot-toast';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey } from 'lexical';
import {
   $createImageWithCaptionNode,
   $isImageWithCaptionNode,
} from '@/plugins/ImageWithCaptionPlugin/nodes/ImageWithCaptionNode';

// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">
import 'react-spring-bottom-sheet/dist/style.css';
import './styles.css';

interface BottomSheetProps extends ImageWithCaptionProps {
   isOpen: boolean;
   onDismiss: () => void;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
   isOpen,
   onDismiss,
   src,
   lexicalNodeKey,
}) => {
   const [editor] = useLexicalComposerContext();

   const handleCopyLinkToOriginal = async () => {
      await navigator.clipboard.writeText(src);

      toast('Copied link to clipboard', {
         position: 'bottom-center',
      });
   };

   const handleDuplicate = async () => {
      editor.update(() => {
         const currentNode = $getNodeByKey(lexicalNodeKey);
         if (currentNode && $isImageWithCaptionNode(currentNode)) {
            const a = $createImageWithCaptionNode({
               src: currentNode.__src,
               caption: currentNode.__caption,
            });

            currentNode.insertAfter(a);

            toast.success('Duplicated');
         }
      });
   };

   const handleRemove = async () => {
      editor.update(() => {
         const currentNode = $getNodeByKey(lexicalNodeKey);
         if (currentNode && $isImageWithCaptionNode(currentNode)) {
            currentNode.remove();

            toast.success('Deleted');
         }
      });
   };

   return (
      <SpringBottomSheet
         className="bg-gray-800"
         open={isOpen}
         onDismiss={onDismiss}
         // TODO: Max height when is ready
         // snapPoints={({ minHeight, maxHeight }) => maxHeight}
         header={<Header onDismiss={onDismiss} />}
      >
         <div className="bg-gray-900 h-max pb-6">
            <ListBlock>
               <ListItem
                  onClick={handleRemove}
                  Icon={<BsTrash3 />}
                  title={'Delete'}
               />
               <ListItem
                  onClick={handleDuplicate}
                  Icon={<HiOutlineDuplicate />}
                  title={'Duplicate'}
               />
               <ListItem Icon={<FiArrowDown />} title={'Insert below'} />
            </ListBlock>
            <ListBlock>
               <ListItem
                  Icon={<BsGlobe2 />}
                  title={'Copy link to original'}
                  onClick={handleCopyLinkToOriginal}
               />
               <ListItem Icon={<BsLink45Deg />} title={'Copy link to block'} />
            </ListBlock>
            <ListBlock>
               <ListItem Icon={<BiZoomIn />} title={'Full screen'} />
               <ListItem Icon={<HiArrowUpRight />} title={'View original'} />
               <ListItem Icon={<BsArrowDownCircle />} title={'Download'} />
               <ListItem Icon={<PiArrowsClockwise />} title={'Replace'} />
               <ListItem Icon={<PiArrowElbowUpRightBold />} title={'Move to'} />
            </ListBlock>
            <ListBlock>
               <ListItem Icon={<BsChatLeftText />} title={'Comment'} />
               <ListItem Icon={<TbTextCaption />} title={'Caption'} />
            </ListBlock>
            <ListBlock>
               <ListItem
                  Icon={<LuAlignVerticalSpaceAround />}
                  title={'Align'}
               />
            </ListBlock>
         </div>
      </SpringBottomSheet>
   );
};
