"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import ScrollablePhotoGallery from "./ScrollablePhotoGallery";
import type { MemoryMediaGroup } from "@/lib/mediaData";

type MemoryExperienceProps = {
  groups: MemoryMediaGroup[];
};

export default function MemoryExperience({ groups }: MemoryExperienceProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const gallery = galleryRef.current;

    if (!gallery || groups.length === 0) {
      return;
    }

    const syncFromScroll = () => {
      rafRef.current = null;

      const galleryRect = gallery.getBoundingClientRect();
      const focusLine = galleryRect.top + galleryRect.height * 0.48;
      const groupElements = Array.from(
        gallery.querySelectorAll<HTMLElement>("[data-memory-group]"),
      );

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      groupElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const groupCenter = rect.top + rect.height * 0.42;
        const distance = Math.abs(groupCenter - focusLine);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((current) =>
        current === closestIndex ? current : closestIndex,
      );
    };

    const requestSync = () => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(syncFromScroll);
    };

    requestSync();
    gallery.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }

      gallery.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, [groups.length]);

  return (
    <section
      aria-label="Birthday memory gallery"
      className="relative isolate h-svh overflow-hidden bg-[#fff8f4]"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_12%,rgba(255,255,255,0.92),transparent_32%),linear-gradient(135deg,#fffafb_0%,#fff0f4_46%,#fff8ed_100%)]" />
      <div className="absolute left-[-8rem] top-[-9rem] -z-10 h-80 w-80 rounded-full bg-[#ffd2df]/55 blur-3xl" />
      <div className="absolute bottom-[-12rem] right-[-10rem] -z-10 h-[32rem] w-[32rem] rounded-full bg-[#ffe0aa]/48 blur-3xl" />

      <div className="h-full">
        <ScrollablePhotoGallery
          activeIndex={activeIndex}
          galleryRef={galleryRef}
          groups={groups}
          reducedMotion={reducedMotion}
        />
      </div>
    </section>
  );
}
