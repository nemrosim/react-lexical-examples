import React, { useCallback, useId, useMemo, useState } from 'react';
import {
   autoUpdate,
   FloatingFocusManager,
   shift,
   useClick,
   useDismiss,
   useFloating,
   useInteractions,
   useRole,
} from '@floating-ui/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { motion, AnimatePresence } from 'framer-motion';

const useLexicalStateUpdate = () => {
   const [editor] = useLexicalComposerContext();

   const updateLexicalState = () => {};
};

export const usePopover = () => {
   // TODO
   useLexicalStateUpdate();

   const [isOpen, setIsOpen] = useState(false);

   const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      middleware: [
         // offset(10),
         // flip({ fallbackAxisSideDirection: 'end' }),
         shift(),
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

      console.log('floatingStyles', floatingStyles);

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
                  className="absolute z-10 inline-block w-full text-sm text-gray-500 duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
                  aria-labelledby={headingId}
                  {...getFloatingProps()}
               >
                  <div
                     id={headingId}
                     className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700"
                  >
                     <h3 className="font-semibold text-gray-900 dark:text-white">
                        Review balloon
                     </h3>
                  </div>
                  <form>
                     <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                     >
                        Search
                     </label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                           <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                           >
                              <path
                                 stroke="currentColor"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                              />
                           </svg>
                        </div>
                        <input
                           type="search"
                           id="default-search"
                           className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Search Mockups, Logos..."
                           required
                        />
                        <button
                           type="submit"
                           className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                           Search
                        </button>
                     </div>
                  </form>
                  <br />
                  <button style={{ float: 'right' }} onClick={handleOnClick}>
                     Add
                  </button>
               </motion.div>
            </AnimatePresence>
         </FloatingFocusManager>
      );
   }, [
      context,
      floatingStyles,
      getFloatingProps,
      handleOnClick,
      headingId,
      isOpen,
      refs.setFloating,
   ]);

   return {
      Popover,
      popoverReferenceProps: getReferenceProps(),
      setPopoverReference: refs.setReference,
   };
};
