import React from "react";
import { PiPhoneThin } from "react-icons/pi";
import { IoMailOpenOutline } from "react-icons/io5";
import YellowBtn from "./Elements/YellowBtn";

export default function NavBar() {
  const topNavLinks = [
    { name: "About Us", link: "" },
    { name: "Blog", link: "" },
    { name: "FAQs", link: "" },
  ];
  const bottomNavLinks = [
    { name: "Destinations", link: "" },
    { name: "Tours & Safaris", link: "" },
    { name: "Accommontations", link: "" },
    { name: "Locations", link: "" },
    { name: "Contact Us", link: "" },
  ];
  return (
    <header>
      <div className="w-full overflow-hidden relative">
        <div className=" w-full bg-canopy-line font-poppins text-white ">
          <div className="  py-2  w-full px-5 sm:px-0 sm:w-11/12 lg:max-w-350 mx-auto flex items-center justify-between">
            <div className=" w-fit flex items-center justify-center gap-3 font-thin">
              <div className=" flex items-center justify-center gap-1 text-xs">
                <PiPhoneThin className=" size-4" />
                <p className=" -translate-x-1.5 translate-y-0.5 scale-90 cursor-pointer">
                  +94 754540123
                </p>
              </div>
              <div className=" flex items-center justify-center gap-1 text-xs cursor-pointer ">
                <IoMailOpenOutline className=" size-4" />
                <p>jastanric@outlook.com</p>
              </div>
            </div>
            <div className=" w-fit text-xs flex items-center justify-center gap-3 font-thin">
              {topNavLinks.map((item, i) => (
                <p key={i} className=" cursor-pointer  ">
                  {item.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className=" w-full bg-[#fffef8] py-2 ">
          <div className="w-full px-5 sm:px-0 sm:w-11/12 lg:max-w-350 mx-auto flex items-center justify-between font-semibold">
            <div className=" w-fit text-xs flex items-center justify-center gap-5 ">
              {bottomNavLinks.map((item, i) => (
                <p
                  key={i}
                  className={`cursor-pointer ${i > 2 ? " hidden" : ""}  hover:-translate-y-0.5 duration-300 transition-all`}
                >
                  {item.name}
                </p>
              ))}
            </div>
            <div className=" w-fit text-xs flex items-center justify-center gap-5 ">
              {bottomNavLinks.map((item, i) => (
                <p
                  key={i}
                  className={`cursor-pointer ${i < 3 ? " hidden" : ""} hover:-translate-y-0.5  duration-300 transition-all`}
                >
                  {item.name}
                </p>
              ))}
              <YellowBtn text="Plan Your Safari" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
