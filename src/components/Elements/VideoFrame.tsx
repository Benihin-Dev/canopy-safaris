"use client";
import { useEffect, useMemo } from "react";
import { PiX } from "react-icons/pi";

type Props = {
  open: boolean;
  onClose: () => void;
  url: string; // YouTube, Vimeo, or a direct .mp4/.webm/.ogg link
  title?: string;
};

type Source = { kind: "iframe" | "video"; src: string };

function parseSource(raw: string): Source | null {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\./, "");

  // YouTube
  let yt: string | null = null;
  if (host === "youtu.be") yt = u.pathname.slice(1);
  else if (
    host.endsWith("youtube.com") ||
    host.endsWith("youtube-nocookie.com")
  ) {
    if (u.pathname === "/watch") yt = u.searchParams.get("v");
    else {
      const m = u.pathname.match(/^\/(embed|shorts|live)\/([\w-]+)/);
      if (m) yt = m[2];
    }
  }
  if (yt)
    return {
      kind: "iframe",
      src: `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`,
    };

  // Vimeo
  if (host.endsWith("vimeo.com")) {
    const id = u.pathname.match(/(\d+)/)?.[1];
    if (id)
      return {
        kind: "iframe",
        src: `https://player.vimeo.com/video/${id}?autoplay=1`,
      };
  }

  // Direct video file
  if (/\.(mp4|webm|ogg|mov)$/i.test(u.pathname))
    return { kind: "video", src: raw };

  // Anything else: try embedding as-is (works only if the site allows framing)
  return { kind: "iframe", src: raw };
}

export default function VideoFrame({
  open,
  onClose,
  url,
  title = "Video",
}: Props) {
  const source = useMemo(() => parseSource(url), [url]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open || !source) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 flex size-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
        >
          <PiX className="size-5" />
        </button>

        <div className="aspect-video w-full overflow-hidden bg-black shadow-2xl">
          {source.kind === "video" ? (
            <video
              className="h-full w-full"
              src={source.src}
              controls
              autoPlay
              playsInline
            />
          ) : (
            <iframe
              className="h-full w-full"
              src={source.src}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}
