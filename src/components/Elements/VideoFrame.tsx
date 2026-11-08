"use client";
import React, { useRef, useState } from "react";
import { PiPlayFill } from "react-icons/pi";

interface VideoFrameProps {
  src?: string; // e.g. "/videos/about.mp4" (leave empty until the video is ready)
  poster?: string; // optional cover image, e.g. "/images/about-poster.jpg"
}

export default function VideoFrame({ src, poster }: VideoFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (!src || !videoRef.current) return;
    videoRef.current.play().catch(() => setPlaying(false));
    setPlaying(true);
  };

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[999px] rounded-b-4xl bg-canopy-deep shadow-2xl">
      {src ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          controls={playing}
          playsInline
          onEnded={() => setPlaying(false)}
        />
      ) : (
        <div className="flex h-full w-full items-end justify-center pb-16 text-center font-poppins text-xs text-white/50">
          Your video will appear here
        </div>
      )}

      {!playing && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play video"
          className="absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#ffcd09] text-black shadow-lg transition-transform duration-300 hover:scale-110"
        >
          <PiPlayFill className="size-8 translate-x-0.5" />
        </button>
      )}
    </div>
  );
}
