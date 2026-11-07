import React from "react";
import { IoIosTimer } from "react-icons/io";
import YellowBtn from "./YellowBtn";
import Image from "next/image";

interface PricingCardProps {
  image: string;
  title: string;
  startingPrice: string;
  subTitle: string;
  places: string[];
  tourDuration: string;
  index: number;
  offerType: string;
}

export default function PricingCard({
  image,
  title,
  startingPrice,
  subTitle,
  places,
  tourDuration,
  index,
  offerType,
}: PricingCardProps) {
  return (
    <div
      key={index}
      className=" w-full shadow -sm bg-white overflow-hidden rounded-xl relative group duration-300 transition-all"
    >
      <div className=" w-full aspect-8/5 relative overflow-hidden">
        <Image
          className=" w-full h-full object-cover relative scale-105 group-hover:scale-100 duration-300 ease-in-out transition-all"
          src={image}
          alt="map image"
          width={600}
          height={200}
          priority
        />
        {index === 0 || index === 2 ? (
          <p className=" w-fit absolute top-5 left-2 bg-[#3c5c05] text-white px-3 py-1 rounded-full text-xs  ">
            {offerType}
          </p>
        ) : (
          <p className=" w-fit absolute top-5 left-2 bg-[#ffcd09] text-black px-3 py-1 rounded-full text-xs  ">
            {offerType}
          </p>
        )}
      </div>

      <div className=" p-4 lg:p-5 space-y-4">
        <div className=" flex items-center gap-2">
          <IoIosTimer className=" size-5" />
          <h3 className=" font-poppins text-sm font-me dium">{tourDuration}</h3>
        </div>
        <h2 className="font-libertinus_Math w-full text-2xl text-[#0a0e01] font-semibold mt-2">
          {title} - {places.join(" | ")}
        </h2>
        <p className=" w-full mx-auto text-sm font-poppins text-gray-600">
          {subTitle}
        </p>
        <div className=" w-full flex items-center justify-between gap-5 invisible">
          <div className="  w-fit">
            <p className=" mx-auto text-sm font-poppins text-gray-600">
              Starting Price
            </p>
            <h4 className=" text-sm font-poppins font-medium text-black">
              {startingPrice}
            </h4>
          </div>
          <YellowBtn btnHeight="py-2.5" text="View Details" />
        </div>
        <div className=" p-4 lg:p-5 flex items-center justify-between gap-5 absolute bottom-4 left-0 w-full h-fit">
          <div className="  w-fit">
            <p className=" mx-auto text-sm font-poppins text-gray-600">
              Starting Price
            </p>
            <h4 className=" text-sm font-poppins font-medium text-black">
              {startingPrice}
            </h4>
          </div>
          <YellowBtn btnHeight="py-2.5" text="View Details" />
        </div>
      </div>
    </div>
  );
}
