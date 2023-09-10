import React from 'react';

export const Header: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => {
   return (
      <div className="flex flex-row content-stretch h-11 justify-between bg-gray-800  drop-shadow-lg">
         <div className="w-14 px-4" />
         <button className="cursor-pointer px-4 font-bold text-white">
            Actions
         </button>
         <button
            className="cursor-pointer px-4 font-bold text-blue-500"
            onClick={onDismiss}
         >
            Done
         </button>
      </div>
   );
};
