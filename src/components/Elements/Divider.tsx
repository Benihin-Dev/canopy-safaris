import React from "react";
import Image from "next/image";

export default function Divider() {
  return (
    <div className=" w-full relative border border-black">
      <div className=" w-full z-30 absolute bottom-0 left-0 scale-y-50 md:scale-y-80 translate-y-1/4 md:translate-y-1/8">
        <div className=" w-full flex items-center ">
          <Image
            className=" w-full md:w-1/3 object-contain"
            src="/images/divider4.svg"
            alt="bg image"
            width={500}
            height={100}
            priority
          />
          <Image
            className=" w-full md:w-1/3 object-contain scale-x-[-1] -translate-x-20"
            src="/images/divider4.svg"
            alt="bg image"
            width={500}
            height={100}
            priority
          />
          <Image
            className=" w-full md:w-1/3 object-contain -translate-x-24"
            src="/images/divider4.svg"
            alt="bg image"
            width={500}
            height={100}
            priority
          />
          <Image
            className=" w-full md:w-1/3 object-contain scale-x-[-1] -translate-x-32"
            src="/images/divider4.svg"
            alt="bg image"
            width={500}
            height={100}
            priority
          />
        </div>
      </div>
    </div>
  );
}
