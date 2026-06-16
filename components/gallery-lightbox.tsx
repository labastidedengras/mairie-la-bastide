"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  photos: string[];
  title?: string;
}

export default function GalleryLightbox({ photos, title }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(
    () => setIndex((s) => (s - 1 + photos.length) % photos.length),
    [photos.length],
  );
  const next = useCallback(
    () => setIndex((s) => (s + 1) % photos.length),
    [photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  if (!photos || photos.length === 0) return null;

  return (
    <>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-2">
        {photos.map((src, i) => (
          <button
            key={i}
            onClick={() => openAt(i)}
            className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border border-stone-200 shadow-sm"
            aria-label={`Ouvrir la photo ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${title ?? "Photo"} ${i + 1}`}
              fill
              sizes="(max-width:640px)100vw,50vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative max-w-[1100px] w-full max-h-[90vh]">
            <button
              onClick={close}
              className="absolute right-2 top-2 z-50 rounded-full bg-white/90 p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full h-[70vh] sm:h-[80vh] bg-black">
              <Image
                src={photos[index]}
                alt={`${title ?? "Photo"} ${index + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-white">
              <button onClick={prev} className="rounded-full bg-white/10 p-2">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="text-sm">{`${index + 1} / ${photos.length}`}</div>
              <button onClick={next} className="rounded-full bg-white/10 p-2">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
