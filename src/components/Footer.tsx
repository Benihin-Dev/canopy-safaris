import React from "react";
import Image from "next/image";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { IoMailOpenOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className=" w-full relative overflow-hidden mt-3 bg-[#613d1d] text-white">
      <div className=" w-full sm:w-11/12 lg:max-w-350 mx-auto px-5 sm:px-0 py-5">
        <div className=" w-full border-t h-5 sm:h-15 border-white"></div>
        <div className=" w-full sm:grid  grid-cols-3 font-semibold space-y-8 sm:space-y-0">
          <div className=" w-full sm:hidden flex items-center">
            <div className=" w-20 aspect-square">
              <Image
                className="object-cover"
                src="/images/logo.png"
                alt="bg image"
                width={250}
                height={250}
                priority
              />
            </div>
            <h1 className=" text-3xl font-libertinus_Math font-bold">Canofy</h1>
          </div>
          <div className=" w-full flex flex-col  justify-center ">
            <h2 className=" text-lg xl:text-xl  pb-4">Contact Us</h2>
            <div className=" flex items-center gap-2 not-first:">
              <MdOutlinePhoneInTalk className=" size-6  text-[#e77b2a]" />
              <p className=" cursor-pointer">+94 754540123</p>
            </div>
            <div className=" flex items-center gap-2 cursor-pointer ">
              <IoMailOpenOutline className=" size-6 text-[#e77b2a]" />
              <p>jastanric@outlook.com</p>
            </div>
          </div>
          <div className=" w-full hidden sm:flex  border-x border-white items-center justify-center">
            <div className=" w-20 aspect-square">
              <Image
                className="object-cover"
                src="/images/logo.png"
                alt="bg image"
                width={250}
                height={250}
                priority
              />
            </div>
            <h1 className=" text-3xl font-libertinus_Math font-semibold">
              Canofy
            </h1>
          </div>
          <div className=" w-full flex flex-col  sm:items-end justify-center ">
            <h2 className=" text-lg xl:text-xl  pb-4">Office</h2>
            <div className=" flex items-center gap-2 not-first:">
              <IoLocationOutline className=" size-6  text-[#e77b2a]" />
              <p className=" cursor-pointer">Brooklyn Heights, Los</p>
            </div>
            <p className="  pl-8 sm:pl-0">Angeles, California</p>
          </div>
        </div>
        <div className=" w-full border-b h-5 sm:h-15 border-white"></div>
      </div>
    </footer>
  );
}
