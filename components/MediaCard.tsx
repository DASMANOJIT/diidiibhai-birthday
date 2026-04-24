"use client";

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { MemoryMediaItem, MemoryMediaSize } from "@/lib/mediaData";

type MediaCardProps = {
  item: MemoryMediaItem;
  index: number;
  groupIndex: number;
  isActiveGroup: boolean;
  reducedMotion?: boolean;
  scrollRootRef?: RefObject<HTMLDivElement | null>;
};

const frameClasses: Record<MemoryMediaSize, string> = {
  hero: "min-h-[58svh] sm:col-span-7 sm:min-h-[74svh] xl:col-span-8",
  portrait: "min-h-[52svh] sm:col-span-5 sm:min-h-[74svh] xl:col-span-4",
  wide: "min-h-[42svh] sm:col-span-5 sm:min-h-[44svh] xl:col-span-4",
  square: "min-h-[42svh] sm:col-span-5 sm:min-h-[44svh] xl:col-span-4",
};

const mediaSizes: Record<MemoryMediaSize, string> = {
  hero: "(max-width: 640px) 86vw, (max-width: 1280px) 56vw, 62vw",
  portrait: "(max-width: 640px) 86vw, (max-width: 1280px) 36vw, 30vw",
  wide: "(max-width: 640px) 86vw, (max-width: 1280px) 40vw, 34vw",
  square: "(max-width: 640px) 86vw, (max-width: 1280px) 34vw, 28vw",
};

function VideoUnavailableState({
  item,
  size,
}: {
  item: MemoryMediaItem;
  size: MemoryMediaSize;
}) {
  return (
    <>
      {item.poster ? (
        <>
          <Image
            fill
            alt=""
            aria-hidden="true"
            className="object-cover opacity-60 blur-[1px]"
            quality={60}
            sizes={mediaSizes[size]}
            src={item.poster}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,247,0.18)_0%,rgba(255,248,247,0.38)_34%,rgba(107,66,66,0.52)_100%)]" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.95),transparent_26%),linear-gradient(145deg,#ffe8ee_0%,#f9d8cf_44%,#f0cdb8_100%)]" />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_42%,rgba(94,61,61,0.16)_100%)]" />
      <div className="absolute inset-x-4 bottom-4 rounded-[1.35rem] border border-white/70 bg-white/72 px-4 py-4 text-left shadow-[0_18px_45px_rgba(104,60,65,0.16)] backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:px-5">
        <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#bb7a83]">
          video keepsake
        </p>
        <h3 className="mt-2 text-base font-black text-[#654947] sm:text-lg">
          {item.fallbackLabel ?? "Video memory unavailable"}
        </h3>
        <p className="mt-2 text-sm leading-6 text-[#8a6661]">
          This clip needs a hosted production URL before it can play after
          deployment.
        </p>
      </div>
    </>
  );
}

export default function MediaCard({
  item,
  index,
  groupIndex,
  isActiveGroup,
  reducedMotion = false,
  scrollRootRef,
}: MediaCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const size = item.size ?? (item.featured ? "hero" : "portrait");
  const isHero = size === "hero" || item.featured;
  const [isVisible, setIsVisible] = useState(groupIndex === 0 && index === 0);
  const [hasError, setHasError] = useState(false);
  const objectFitClass = item.fit === "cover" ? "object-cover" : "object-contain";
  const shouldRenderFallback =
    item.type === "video" && (item.placeholderOnly || !item.src || hasError);
  const shouldPlayVideo =
    item.type === "video" &&
    !shouldRenderFallback &&
    isActiveGroup &&
    isVisible;

  useEffect(() => {
    const node = cardRef.current;

    if (!node) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));

      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.32);
      },
      {
        root: scrollRootRef?.current ?? null,
        threshold: [0.12, 0.32, 0.58, 0.82],
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [scrollRootRef]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    if (!shouldPlayVideo) {
      video.pause();
      return;
    }

    video.play().catch(() => undefined);
  }, [shouldPlayVideo]);

  return (
    <motion.article
      ref={cardRef}
      className={`${frameClasses[size]} relative min-w-0`}
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              scale: isHero ? 0.97 : 0.94,
              y: 30,
            }
      }
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: isHero ? 0.3 : 0.22 }}
      transition={{
        delay: reducedMotion ? 0 : index * 0.05,
        duration: reducedMotion ? 0.16 : 0.62,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="relative h-full min-h-[inherit] overflow-hidden rounded-[1.6rem] border border-white/70 bg-white p-1.5 shadow-[0_30px_90px_rgba(114,63,68,0.2)] sm:rounded-[2.35rem] sm:p-2">
        <div className="relative h-full min-h-[inherit] overflow-hidden rounded-[1.15rem] bg-[#f4dfdb] sm:rounded-[1.8rem]">
          {item.type === "image" ? (
            <Image
              fill
              alt={item.alt ?? `Memory from ${item.year}`}
              className={objectFitClass}
              fetchPriority={groupIndex === 0 && index === 0 ? "high" : "auto"}
              loading={groupIndex === 0 && index === 0 ? "eager" : "lazy"}
              quality={isHero ? 82 : 76}
              sizes={mediaSizes[size]}
              src={item.src}
              style={{ transform: `rotate(${item.rotation ?? 0}deg)` }}
            />
          ) : shouldRenderFallback ? (
            <VideoUnavailableState item={item} size={size} />
          ) : (
            <video
              ref={videoRef}
              aria-label={item.alt ?? `Memory video from ${item.year}`}
              className={`h-full min-h-[inherit] w-full ${objectFitClass}`}
              controls={false}
              disablePictureInPicture
              loop
              muted
              onCanPlay={(event) => {
                if (shouldPlayVideo) {
                  event.currentTarget.play().catch(() => undefined);
                }
              }}
              onError={() => setHasError(true)}
              playsInline
              poster={item.poster}
              preload="metadata"
              style={{ transform: `rotate(${item.rotation ?? 0}deg)` }}
            >
              <source src={item.src} type={item.mimeType ?? "video/mp4"} />
            </video>
          )}

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,transparent_48%,rgba(85,48,47,0.14)_100%)]" />
          <div className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#a16f69] shadow-[0_12px_30px_rgba(90,48,52,0.12)] backdrop-blur-md">
            {item.type === "video" ? "video" : "photo"}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
