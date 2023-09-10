import React from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import { FieldValues, useForm } from 'react-hook-form';
import validator from 'validator';
import { $getNodeByKey } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ImageWithCaptionProps } from '@/plugins/ImageWithCaptionPlugin/nodes/components';
import { $isImageWithCaptionNode } from '@/plugins/ImageWithCaptionPlugin/nodes/ImageWithCaptionNode';

const ImageSrcInputName = 'imageSrc';

export const PopoverInput: React.FC<ImageWithCaptionProps> = ({
   src,
   lexicalNodeKey,
}) => {
   const [editor] = useLexicalComposerContext();

   const {
      register,
      formState: { errors },
      handleSubmit,
   } = useForm({
      defaultValues: {
         imageSrc: src,
      },
   });

   const onSubmit = (data: FieldValues) => {
      const imageSrcInputValue = data[ImageSrcInputName];

      editor.update(() => {
         const node = $getNodeByKey(lexicalNodeKey);
         if ($isImageWithCaptionNode(node)) {
            node.setImageSrc(imageSrcInputValue);
         }
      });
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
         >
            Search
         </label>
         <div className="relative mb-2">
            <div className="absolute hidden inset-y-0 left-0 md:flex items-center pl-3 pointer-events-none">
               <AiOutlineLink />
            </div>
            <input
               {...register(ImageSrcInputName, {
                  required: true,
                  validate: (value) => {
                     if (!validator.isURL(value)) {
                        return 'This is not a URL';
                     }

                     return true;
                  },
               })}
               aria-invalid={errors[ImageSrcInputName] ? 'true' : 'false'}
               className="pr-24 block w-full p-4 md:pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Insert image url"
               tabIndex={0}
            />

            <button
               type="submit"
               className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:px-4 px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
               Update
            </button>
         </div>
         {errors[ImageSrcInputName]?.message && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
               <>
                  <span className="font-medium">Oops! </span>
                  {errors[ImageSrcInputName].message}
               </>
            </p>
         )}
      </form>
   );
};
