import React from "react";

interface TitleTextProps {
  text: string;
}

export default function TitleText({ text }: TitleTextProps) {
  return (
    <h1 className=" font-libertinus_Math text-5xl w-full text-center lg:text-left md:text-4xl text-[#0a0e01] font-medium mt-2">
      {text}
    </h1>
  );
}
