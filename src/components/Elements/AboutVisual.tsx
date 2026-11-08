"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { PiJeep, PiMapPinFill, PiPlayFill, PiScooterThin } from "react-icons/pi";

interface AboutVisualProps {
  videoSrc?: string; // e.g. "/videos/about.mp4" (leave empty until the video is ready)
}

export default function AboutVisual({ videoSrc }: AboutVisualProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // the video plays right inside the brush-shaped frame
  const handlePlay = () => {
    if (!videoSrc || !videoRef.current) return;
    videoRef.current.play().catch(() => setPlaying(false));
    setPlaying(true);
  };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-xl">
      {/* brush-stroke shape traced from the reference image */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="about-blob" clipPathUnits="objectBoundingBox">
            <path d="M0.0553 0.0448 L0.0144 0.0874 L0.0168 0.1009 L0.0409 0.1300 L0.0457 0.1659 L0.0312 0.1973 L0.0000 0.2287 L0.0000 0.2825 L0.0120 0.3879 L0.0337 0.4350 L0.0409 0.4753 L0.0625 0.5067 L0.0889 0.5717 L0.1370 0.6323 L0.1418 0.6480 L0.1370 0.6883 L0.1442 0.7175 L0.1971 0.7803 L0.2188 0.8251 L0.2356 0.8475 L0.2428 0.9170 L0.2596 0.9888 L0.2812 0.9978 L0.5601 0.9978 L0.6058 0.9753 L0.6442 0.9709 L0.7139 0.9529 L0.7572 0.9529 L0.8149 0.9776 L0.8966 0.9709 L0.9663 0.9865 L0.9952 0.9865 L0.9952 0.9753 L0.9471 0.9529 L0.9231 0.9327 L0.9111 0.9103 L0.9038 0.8632 L0.8678 0.8318 L0.8534 0.8004 L0.8534 0.7713 L0.8678 0.7377 L0.8726 0.6883 L0.8942 0.6525 L0.9327 0.6099 L0.9519 0.5740 L0.9952 0.5269 L0.9952 0.5112 L0.9856 0.4865 L0.9856 0.4574 L0.9639 0.4126 L0.9567 0.3834 L0.9615 0.3341 L0.9495 0.3117 L0.9303 0.2915 L0.9207 0.2668 L0.9255 0.2085 L0.9327 0.1883 L0.9327 0.1614 L0.9279 0.1502 L0.9327 0.1121 L0.9279 0.1031 L0.9111 0.0942 L0.8702 0.0964 L0.8317 0.0919 L0.7788 0.1054 L0.7356 0.1054 L0.6899 0.0942 L0.6442 0.0673 L0.5649 0.0336 L0.5096 0.0269 L0.4591 0.0269 L0.4207 0.0090 L0.3750 0.0000 L0.2692 0.0000 L0.2332 0.0090 L0.1923 0.0291 L0.0986 0.0224 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* the frame: shows the photo until a video is added, then plays the video */}
      <div
        className="absolute top-[2%] left-[10%] w-[82%] bg-sky-200"
        style={{ clipPath: "url(#about-blob)", aspectRatio: "416 / 446" }}
      >
        {videoSrc ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSrc}
            poster="/images/aboutRound.png"
            controls={playing}
            playsInline
            onEnded={() => setPlaying(false)}
            onPause={(e) => {
              if (e.currentTarget.ended) setPlaying(false);
            }}
          />
        ) : (
          <Image
            className="object-cover"
            src="/images/aboutRound.png"
            alt="Safari jeep watching elephants"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
        )}
      </div>

      {/* decorations and play button hide while the video is playing */}
      {!playing && (
        <>
          {/* dashed travel path */}
          <svg
            viewBox="0 0 600 600"
            className="pointer-events-none absolute inset-0 z-10"
            aria-hidden="true"
          >
            <path
              d="M70 130 C170 40 300 70 380 120 S520 210 560 150"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeDasharray="7 9"
              strokeLinecap="round"
            />
          </svg>

          {/* line-art scooter */}
          <PiScooterThin className="absolute top-[4%] left-[0%] z-20 size-24 -rotate-6 text-clay md:size-28" />

          {/* map pin */}
          <PiMapPinFill className="absolute top-[40%] right-[20%] z-20 size-7 text-red-600" />

          {/* jeep badge */}
          <div className="absolute bottom-[8%] left-[0%] z-20 flex size-24 items-center justify-center rounded-full bg-[#4aa525] text-white shadow-xl md:size-28">
            <PiJeep className="size-12 md:size-14" />
          </div>

          {/* torn paper label */}
          <div
            className="absolute bottom-[2%] left-[24%] z-20 bg-white px-10 py-3 font-yellowtail text-3xl text-[#1ea5d9] drop-shadow-md md:text-4xl"
            style={{
              clipPath:
                "polygon(0 12%, 4% 0, 12% 10%, 22% 0, 35% 8%, 50% 0, 64% 10%, 78% 0, 90% 9%, 100% 0, 100% 90%, 94% 100%, 82% 88%, 70% 100%, 55% 90%, 40% 100%, 25% 88%, 12% 100%, 0 90%)",
            }}
          >
            Enjoy Safari
          </div>

          {/* play button */}
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Play video"
            className="absolute top-[46%] left-[51%] z-30 flex size-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#4aa525] text-white shadow-lg transition-transform duration-300 hover:scale-110"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[#4aa525]/40"></span>
            <PiPlayFill className="relative size-8 translate-x-0.5" />
          </button>
        </>
      )}
    </div>
  );
}
