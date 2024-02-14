import React, { ReactNode } from "react";
import './card.css';

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="px-6 py-2 rounded-2xl text-start w-[356px] h-[224px] card bg-dark">
      {children}
    </div>
  );
};

export default Card;
