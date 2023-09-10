import { GoKebabHorizontal } from 'react-icons/go';
import React, { useState } from 'react';
import { BiComment } from 'react-icons/bi';
import { useMedia } from 'react-use';
import { BottomSheet } from '@/plugins/ImageWithCaptionPlugin/nodes/components/ImageWithCaption/components/BottomSheet';
import { ImageWithCaptionProps } from '@/plugins/ImageWithCaptionPlugin/nodes/components';

export const OverlayMenuIcons: React.FC<ImageWithCaptionProps> = (props) => {
   const [isOpen, setIsOpen] = useState(false);
   const isMobile = useMedia('(max-width: 640px)');

   return (
      <div
         style={{
            top: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            position: 'absolute',
         }}
      >
         <div
            className="rounded-sm"
            style={{
               position: 'absolute',
               top: '4px',
               backgroundColor: 'rgba(0,0,0,0.1)',
               // backgroundColor: 'red',
               right: '4px',
               color: 'white',
               cursor: 'pointer',
            }}
         >
            <div className="flex">
               <div
                  className="p-1"
                  style={{
                     borderRight: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
               >
                  <BiComment />
               </div>
               <button className="p-1" onClick={() => setIsOpen(true)}>
                  <GoKebabHorizontal />
               </button>
            </div>
         </div>
         <BottomSheet
            {...props}
            isOpen={isOpen}
            onDismiss={() => setIsOpen(false)}
         />
      </div>
   );
};
