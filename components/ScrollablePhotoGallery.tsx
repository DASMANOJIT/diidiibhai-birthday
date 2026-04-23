"use client";

import { useEffect, useRef, type RefObject } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { MemoryMediaGroup, MemoryMediaItem } from "@/lib/mediaData";

type ScrollablePhotoGalleryProps = {
  groups: MemoryMediaGroup[];
  galleryRef: RefObject<HTMLDivElement | null>;
  activeIndex: number;
  reducedMotion?: boolean;
};

const frameClasses: Record<MemoryMediaItem["size"] & string, string> = {
  hero: "min-h-[58svh] sm:col-span-7 sm:min-h-[74svh] xl:col-span-8",
  portrait: "min-h-[52svh] sm:col-span-5 sm:min-h-[74svh] xl:col-span-4",
  wide: "min-h-[42svh] sm:col-span-5 sm:min-h-[44svh] xl:col-span-4",
  square: "min-h-[42svh] sm:col-span-5 sm:min-h-[44svh] xl:col-span-4",
};

const mediaSizes = {
  hero: "(max-width: 640px) 86vw, (max-width: 1280px) 56vw, 62vw",
  portrait: "(max-width: 640px) 86vw, (max-width: 1280px) 36vw, 30vw",
  wide: "(max-width: 640px) 86vw, (max-width: 1280px) 40vw, 34vw",
  square: "(max-width: 640px) 86vw, (max-width: 1280px) 34vw, 28vw",
};

function MediaCard({
  item,
  index,
  groupIndex,
  isActiveGroup,
  reducedMotion,
}: {
  item: MemoryMediaItem;
  index: number;
  groupIndex: number;
  isActiveGroup: boolean;
  reducedMotion?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const size = item.size ?? (item.featured ? "hero" : "portrait");
  const isHero = size === "hero" || item.featured;

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    if (isActiveGroup) {
      video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [isActiveGroup, reducedMotion]);

  return (
    <motion.article
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
              alt={`Memory from ${item.year}`}
              className="object-contain"
              fetchPriority={groupIndex === 0 && index === 0 ? "high" : "auto"}
              loading={groupIndex === 0 && index === 0 ? "eager" : "lazy"}
              quality={isHero ? 82 : 76}
              sizes={mediaSizes[size]}
              src={item.src}
              style={{ transform: `rotate(${item.rotation ?? 0}deg)` }}
            />
          ) : (
            <video
              ref={videoRef}
              aria-label={`Memory video from ${item.year}`}
              autoPlay={isActiveGroup}
              className="h-full min-h-[inherit] w-full object-contain"
              disablePictureInPicture
              loop
              muted
              onCanPlay={(event) => {
                if (isActiveGroup) {
                  event.currentTarget.play().catch(() => undefined);
                }
              }}
              playsInline
              preload="auto"
              src={item.src}
              style={{ transform: `rotate(${item.rotation ?? 0}deg)` }}
            />
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

export default function ScrollablePhotoGallery({
  groups,
  galleryRef,
  activeIndex,
  reducedMotion = false,
}: ScrollablePhotoGalleryProps) {
  return (
    <div
      ref={galleryRef}
      className="memory-hidden-scrollbar h-svh min-w-0 overflow-y-auto overflow-x-hidden"
      tabIndex={0}
    >
      <div className="relative">
        {groups.map((group, groupIndex) => (
          <section
            key={`${group.year}-${groupIndex}`}
            aria-label={`Memory media for ${group.year}`}
            className="relative flex min-h-[112svh] items-center overflow-hidden px-3 py-7 sm:min-h-[104svh] sm:px-6 sm:py-10 lg:px-10"
            data-memory-group
          >
            <div className="absolute inset-0 -z-10 opacity-90">
              <div className="absolute left-[12%] top-[12%] h-56 w-56 rounded-full bg-[#ffd2df]/38 blur-3xl" />
              <div className="absolute bottom-[8%] right-[8%] h-72 w-72 rounded-full bg-[#ffe4b8]/38 blur-3xl" />
            </div>

            <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-5 lg:gap-6">
              {group.media.map((item, index) => (
                <MediaCard
                  key={item.src}
                  groupIndex={groupIndex}
                  index={index}
                  isActiveGroup={activeIndex === groupIndex}
                  item={item}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
