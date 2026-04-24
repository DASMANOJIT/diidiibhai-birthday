"use client";

import type { RefObject } from "react";
import MediaCard from "./MediaCard";
import type { MemoryMediaGroup } from "@/lib/mediaData";

type ScrollablePhotoGalleryProps = {
  groups: MemoryMediaGroup[];
  galleryRef: RefObject<HTMLDivElement | null>;
  activeIndex: number;
  reducedMotion?: boolean;
};

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
                  scrollRootRef={galleryRef}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
