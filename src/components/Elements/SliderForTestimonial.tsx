"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

interface SliderForTestimonialProps {
  viewPort: "desktop" | "tablet" | "mobile" | string;
}

export default function SliderForTestimonial({
  viewPort,
}: SliderForTestimonialProps) {
  const blogs = [
    "/images/testimonial/testimonial1.png",
    "/images/testimonial/testimonial2.png",
    "/images/testimonial/testimonial3.png",
    "/images/testimonial/testimonial1.png",
    "/images/testimonial/testimonial2.png",
    "/images/testimonial/testimonial3.png",
  ];
  const slides = blogs.map((item) => item);
  const sliderRef = useRef<Slider>(null);

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
        arrows={false}
        slidesToShow={
          viewPort === "desktop" ? 3 : viewPort === "tablet" ? 2 : 1
        }
        slidesToScroll={1}
        autoplay={viewPort === "desktop" ? true : false}
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
            className={` w-full h-full ${viewPort === "mobile" ? "" : "px-1"} `}
          >
            <div className=" w-full h-full">
              <Image
                className="object-cover h- full w-full "
                src={item}
                alt={item}
                width={200}
                height={100}
                priority
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
