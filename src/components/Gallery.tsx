"use client";
import React, { useState } from "react";
import Heading from "./Elements/Heading";

export default function Gallery() {
  const [activeItem, setActiveItem] = useState(1);
  const galleryTypes = [
    "National Parks",
    "Wildlife Close-Ups",
    "Golden Hour",
    "Camp Life",
  ];
  return (
    <div className=" w-full py-20 relative bg-[#121212]">
      <div className=" w-full sm:w-11/12 lg:max-w-350 mx-auto px-5 sm:px-0 ">
        <div className="w-full">
          <Heading
            title="Gallery | Canopy Safaris"
            textColor="text-[#ffffff] tracking-wider"
            lineColor="from-[#ffffff]"
          />
        </div>
        <h1 className="font-libertinus_Math text-5xl w-full text-center md:text-5xl xl:text-6xl mx-auto pb-1 text-[#ffffff] font-medium mt-2">
          Moments From The Wild
        </h1>
        <h2 className="w-1/2 mx-auto text-sm font-poppins text-[#ffffff] text-center">
          A visual journey through Sri Lanka's landscapes and wildlife, captured
          on our safaris
        </h2>
        <div className=" w-full flex items-center justify-center gap-6 pb-10 mt-14 relative z-30">
          {galleryTypes.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setActiveItem(i + 1);
              }}
              className={` ${activeItem === i + 1 ? "bg-white text-[#121212]" : " bg-transparent text-gray-400"} hover:bg-white hover:text-[#121212] rounded-lg cursor-pointer duration-300 transition-all px-5 py-2  font-poppins text-center `}
            >
              {item}
            </div>
          ))}
        </div>
        <div className=" w-full grid grid-cols-3 gap-8 bg-[#232323] p-8 rounded-3xl overflow-hidden ">
          <div className=" w-full aspect-6/9  not-only:">
            <div
              className={` w-full border bg-black border-gray-400 transition-all ease-out duration-500 rounded-2xl ${activeItem === 1 ? "translate-x-0 h-full" : activeItem === 2 ? "translate-x-[calc(200%+66px)] h-full" : activeItem === 3 ? "translate-x-0 h-[calc(66%-14px)] translate-y-[calc(50%+26px)]" : activeItem === 4 ? "translate-x-[calc(100%+35px)] h-[calc(66%-16px)] translate-y-[calc(50%+29px)]" : ""}  `}
            ></div>
          </div>
          <div className=" w-full aspect-6/9 ">
            <div className=" w-full h-1/3 pb-4">
              <div
                className={`  w-full border bg-black border-gray-400 transition-all ease-out duration-500 rounded-2xl ${activeItem === 1 ? "translate-x-0 h-full" : activeItem === 2 ? "translate-x-[calc(-100%-32px)] translate-y-[calc(50%+23px)] h-[calc(200%+16px)]" : activeItem === 3 ? "translate-x-0 h-[calc(300%+48px)]" : activeItem === 4 ? "translate-x-[calc(-100%-34px)] translate-y-0 h-[calc(200%+14px)]" : ""}  `}
              ></div>
            </div>
            <div className=" w-full h-2/3  pt-4">
              <div
                className={`  w-full border bg-black border-gray-400 transition-all ease-out duration-500 rounded-2xl 
                   ${activeItem === 1 ? "translate-x-0 h-full" : activeItem === 2 ? "translate-x-0 translate-y-[calc(-50%-25px)] h-full" : activeItem === 3 ? "translate-x-[calc(100%+34px)] h-[calc(50%-4px)] translate-y-[calc(100%+8px)]" : activeItem === 4 ? "translate-x-0 translate-y-[calc(-100%-28px)] h-[calc(50%-4px)]" : ""} 
                     `}
              ></div>
            </div>
          </div>
          <div className=" w-full aspect-6/9 ">
            <div className=" w-full h-2/3 pb-4">
              <div
                className={`w-full border  bg-black border-gray-400 transition-all ease-out duration-500 rounded-2xl ${activeItem === 1 ? "translate-x-0 h-full" : activeItem === 2 ? "translate-x-[calc(-100%-35px)] translate-y-[calc(200%+42px)] h-[calc(50%-6px)]" : activeItem === 3 ? "translate-x-[calc(-200%-68px)] h-[calc(50%-6px)] translate-y-0" : activeItem === 4 ? "translate-x-0 translate-y-[calc(0px)] h-[calc(150%+25px)]" : ""} `}
              ></div>
            </div>
            <div className=" w-full h-1/3 pt-4">
              <div
                className={`  w-full border bg-black border-gray-400 transition-all ease-out duration-500 rounded-2xl ${activeItem === 1 ? "translate-x-0 h-full" : activeItem === 2 ? "translate-x-[calc(-200%-68px)] translate-y-[calc(-200%-48px)] h-full" : activeItem === 3 ? "translate-x-0 h-[calc(200%+12px)] translate-y-[calc(-100%-36px)]" : activeItem === 4 ? "translate-x-[calc(-200%-68px)] translate-y-0 h-full" : ""} `}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
