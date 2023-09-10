import React, { JSX } from 'react';

interface ListItemProps {
   Icon: JSX.Element;
   title: string;
   onClick?: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({ Icon, title, onClick }) => {
   return (
      <div
         onClick={onClick}
         className="bg-gray-800 flex items-center text-white"
      >
         <div className="ml-5 mr-1 mim-h-11 py-4">{Icon}</div>
         <div className="ml-2.5 mr-4">{title}</div>
      </div>
   );
};
