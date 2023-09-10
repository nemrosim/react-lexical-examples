import React, { useCallback, useId, useMemo, useState } from 'react';
import {
   autoUpdate,
   FloatingFocusManager,
   useClick,
   useDismiss,
   useFloating,
   useInteractions,
   offset,
   useRole,
} from '@floating-ui/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { motion, AnimatePresence } from 'framer-motion';
import { PopoverInput } from '@/plugins/ImageWithCaptionPlugin/nodes/components/ImageWithCaption/hooks/usePopover/components';
import { ImageWithCaptionProps } from '@/plugins/ImageWithCaptionPlugin/nodes/components';

const useLexicalStateUpdate = () => {
   const [editor] = useLexicalComposerContext();

   const updateLexicalState = () => {};

   return {
      updateLexicalState,
   };
};

export const usePopover = (props: ImageWithCaptionProps) => {
   // TODO
   const { updateLexicalState } = useLexicalStateUpdate();

   const [isOpen, setIsOpen] = useState(false);

   const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      middleware: [
         offset(({ rects }) => {
            return -rects.reference.height / 2 - rects.floating.height / 2;
         }),
      ],
      whileElementsMounted: autoUpdate,
   });

   const headingId = useId();

   const click = useClick(context);
   const dismiss = useDismiss(context);
   const role = useRole(context);

   const { getReferenceProps, getFloatingProps } = useInteractions([
      click,
      dismiss,
      role,
   ]);

   const handleOnClick = useCallback(() => {
      setIsOpen(false);
   }, []);

   const Popover = useMemo(() => {
      if (!isOpen) {
         return null;
      }

      return (
         <FloatingFocusManager context={context} modal={false}>
            <AnimatePresence>
               <motion.div
                  initial={{
                     opacity: 0,
                  }}
                  animate={{
                     opacity: 1,
                  }}
                  transition={{ ease: 'easeOut', duration: 0.1, delay: 0.2 }}
                  ref={refs.setFloating}
                  style={floatingStyles}
                  className="absolute z-10 text-sm text-gray-500 duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
                  aria-labelledby={headingId}
                  {...getFloatingProps()}
               >
                  <div
                     id={headingId}
                     className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700"
                  >
                     <h3 className="font-semibold text-gray-900 dark:text-white">
                        Update image state
                     </h3>
                  </div>
                  <div className="m-2">
                     <PopoverInput {...props} />
                  </div>
               </motion.div>
            </AnimatePresence>
         </FloatingFocusManager>
      );
   }, [
      context,
      floatingStyles,
      getFloatingProps,
      headingId,
      isOpen,
      props,
      refs.setFloating,
   ]);

   return {
      Popover,
      popoverReferenceProps: getReferenceProps(),
      setPopoverReference: refs.setReference,
   };
};
