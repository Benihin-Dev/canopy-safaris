"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoArrowLeft } from "react-icons/go";

import PricingCard from "./PricingCard";
import YellowBtn from "./YellowBtn";

interface SliderForTestimonialProps {
  viewPort: "desktop" | "tablet" | "mobile" | string;
}

export default function SliderForPackages({
  viewPort,
}: SliderForTestimonialProps) {
  const safariPackages = [
    {
      image: "/images/packages/package1.jpg",
      tourDuration: "5 Days / 6 Days  ",
      title: "Luxury Yala Escape",
      places: ["Yala National Park", "Kumana National Park", "Udawalawe"],
      subTitle:
        "Experience the beauty of Yala on a luxury safari. Spot the Big Five, explore iconic landscapes, and unwind in premium tented camps under the stars.",
      startingPrice: "$1,250",
      offerType: "Limited Time Offer",
    },

    {
      image: "/images/packages/package3.jpg",
      tourDuration: "3 Days / 4 Days",
      title: "Kumana Bird Trail",
      places: ["Kumana National Park", "Yala Buffer Zone"],
      subTitle:
        "A classic safari route through Kumana's famed bird sanctuary and Yala's outskirts, ideal for first-time wildlife travelers on a flexible schedule.",
      startingPrice: "$520",
      offerType: "Group Discount",
    },
    {
      image: "/images/packages/package2.jpg",
      tourDuration: "4 Days / 6 Days",
      title: "Wild Yala Discovery",
      places: ["Yala National Park", "Bundala National Park"],
      subTitle:
        "A well-balanced journey through Yala's dense jungles and open plains, tracking leopards, elephants, and rich birdlife with expert naturalists.",
      startingPrice: "$890",
      offerType: "Seasonal Special",
    },
    {
      image: "/images/packages/package4.jpg",
      tourDuration: "3 Days / 4 Days",
      title: "Kumana Sanctuary Basics",
      places: ["Kumana National Park"],
      subTitle:
        "An essential safari experience through Kumana's wetlands and forests, spotting migratory birds and native wildlife on a comfortable open-air jeep.",
      startingPrice: "$390",
      offerType: "Exclusive Deal",
    },
  ];
  const slides = safariPackages.map((item) => item);
  const sliderRef = useRef<Slider>(null);

  //next btn function
  const handleNextSlide = (event: any) => {
    event.stopPropagation();
    sliderRef.current?.slickNext();
  };

  //previous btn function
  const handlePrevSlide = (event: any) => {
    event.stopPropagation();
    sliderRef.current?.slickNext();
  };

  // Test by applying styles directly
  const dotStyles = {
    width: "18px",
    height: "18px",
    borderRadius: "9999px",
    backgroundColor: "#d1d5db",
    transition: "all 0.3s ease",
  };

  const activeDotStyles = {
    ...dotStyles,
    width: "60px", // longer, pill shape
    borderRadius: "10px",
    backgroundColor: "#fd853a",
  };
  return (
    <div className={` w-full px-1 sm:px-0 h-full  relative  `}>
      <Slider
        ref={sliderRef}
        dots={false}
        infinite={true}
        arrows={true}
        slidesToShow={
          viewPort === "desktop" ? 3 : viewPort === "tablet" ? 2 : 1
        }
        slidesToScroll={1}
        autoplay={false}
        autoplaySpeed={6000}
        speed={500}
        dotsClass="slick-dots flex item-center  justify-center -gap-2 md:gap-2 custom-dots  "
        customPaging={(i) => {
          const currentSlide = (
            sliderRef.current as unknown as {
              innerSlider?: { state: { currentSlide: number } };
            }
          )?.innerSlider?.state.currentSlide;

          return (
            <div
              className="flex items-center md:translate-y-5 scale-80 md:scale-100 justify-center gap-12"
              style={i === currentSlide ? activeDotStyles : dotStyles}
            ></div>
          );
        }}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow:
                viewPort === "desktop" ? 3 : viewPort === "tablet" ? 2 : 1,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow:
                viewPort === "desktop" ? 3 : viewPort === "tablet" ? 2 : 1,
            },
          },
        ]}
      >
        {slides.map((item, i) => (
          <div
            key={i}
            className={` w-full h-full ${viewPort === "mobile" ? "" : "px-2"} `}
          >
            <div className=" w-full h-full">
              <PricingCard
                key={i}
                index={i}
                image={item.image}
                title={item.title}
                tourDuration={item.tourDuration}
                startingPrice={item.startingPrice}
                places={item.places}
                subTitle={item.subTitle}
                offerType={item.offerType}
              />
            </div>
          </div>
        ))}
      </Slider>
      <div className=" absolute -bottom-16 z-10 w-full">
        <div className=" w-full flex items-center justify-center gap-3">
          <div className=" cursor-pointer">
            <div
              className="    duration-200 size-8 border border-gray-600 hover:border-gray-800 transition-all rounded-full flex items-center justify-center  "
              onClick={handlePrevSlide}
            >
              <GoArrowLeft className="size-6 sm:size-8  duration-200  scale-75 " />
            </div>
          </div>
          <div className=" cursor-pointer">
            <div
              className="  duration-200 size-8 border border-gray-600 hover:border-gray-800 transition-all rounded-full flex items-center justify-center "
              onClick={handleNextSlide}
            >
              <GoArrowLeft className="size-6 sm:size-8 rotate-180 duration-200 scale-75 " />
            </div>
          </div>
          <YellowBtn text="View All Packages" />
        </div>
      </div>
    </div>
  );
}
