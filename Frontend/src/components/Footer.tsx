import React from "react";
// import { DiVim } from "react-icons/di";

type FooterProps = {};

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="flex items-center justify-center w-[100vw] h-8 bg-[#4C3EDA] fixed bottom-0 ">
      <p className="text-sm text-white text-center">
        &copy; 2024 PROJECT B.Tech CSE - All rights reserved | Developed by
        Sahed Ali
      </p>
    </div>
  );
};

export default Footer;
