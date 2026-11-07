import React from "react";

interface YellowBtnProps {
  text: string;
  btnHeight?: string;
  onClick?: () => void;
}

export default function YellowBtn({
  text,
  onClick,
  btnHeight,
}: YellowBtnProps) {
  return (
    <button
      onClick={onClick}
      className={` px-5 text-xs lg:text-sm font-semibold cursor-pointer rounded-full bg-[#ffcd09] hover:bg-[#e3b600] duration-300 transition-all ${btnHeight ? btnHeight : "py-1.5"}`}
    >
      {text}
    </button>
  );
}
