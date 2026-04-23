"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const particles = [
  { left: "11%", top: "22%", size: 8, delay: 0.1, color: "#ffd3df" },
  { left: "20%", top: "68%", size: 12, delay: 0.8, color: "#fff0c9" },
  { left: "32%", top: "16%", size: 6, delay: 1.3, color: "#ffffff" },
  { left: "54%", top: "76%", size: 8, delay: 0.3, color: "#ffc6d7" },
  { left: "72%", top: "18%", size: 11, delay: 1, color: "#ffe0aa" },
  { left: "86%", top: "58%", size: 7, delay: 0.5, color: "#ffffff" },
] as const;

const stickerPhotos = [
  {
    src: "/IMG_3557.jpg",
    alt: "Tiny childhood memory sticker",
    className:
      "-left-1 top-0 h-28 w-24 -rotate-8 sm:-left-8 sm:top-2 sm:h-40 sm:w-32 lg:-left-16 lg:top-10 lg:h-52 lg:w-40",
    delay: 0.05,
    rotate: -8,
    sizes: "(max-width: 640px) 96px, (max-width: 1024px) 128px, 160px",
  },
  {
    src: "/IMG_1056.jpg",
    alt: "Celebration memory sticker",
    className:
      "-right-1 top-1 h-28 w-24 rotate-7 sm:-right-8 sm:top-0 sm:h-40 sm:w-36 lg:-right-14 lg:top-12 lg:h-52 lg:w-44",
    delay: 0.18,
    rotate: 7,
    sizes: "(max-width: 640px) 96px, (max-width: 1024px) 136px, 168px",
  },
  {
    src: "/IMG_9941.jpg",
    alt: "Cute puppy memory sticker",
    className:
      "-left-2 bottom-3 h-24 w-28 rotate-5 sm:-bottom-3 sm:left-8 sm:h-36 sm:w-44 lg:-bottom-10 lg:left-12 lg:h-44 lg:w-52",
    delay: 0.3,
    rotate: 5,
    sizes: "(max-width: 640px) 112px, (max-width: 1024px) 168px, 208px",
  },
  {
    src: "/IMG_5888.jpg",
    alt: "Friends memory sticker",
    className:
      "-right-2 bottom-2 h-24 w-32 -rotate-5 sm:-bottom-7 sm:right-10 sm:h-36 sm:w-44 lg:-bottom-10 lg:right-16 lg:h-44 lg:w-56",
    delay: 0.42,
    rotate: -5,
    sizes: "(max-width: 640px) 120px, (max-width: 1024px) 176px, 224px",
  },
] as const;

function StickerPhoto({
  alt,
  className,
  delay,
  reducedMotion,
  rotate,
  sizes,
  src,
}: {
  alt: string;
  className: string;
  delay: number;
  reducedMotion: boolean;
  rotate: number;
  sizes: string;
  src: string;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute z-30 ${className}`}
      initial={
        reducedMotion
          ? false
          : { opacity: 0, scale: 0.86, y: 18, rotate: rotate - 2 }
      }
      animate={
        reducedMotion
          ? { opacity: 1, rotate, scale: 1 }
          : {
              opacity: 1,
              scale: 1,
              rotate: [rotate, rotate + 1.4, rotate],
              y: [0, -7, 0],
            }
      }
      transition={
        reducedMotion
          ? { duration: 0.2 }
          : {
              delay,
              duration: 5.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }
      }
    >
      <div className="relative h-full w-full rounded-[1.05rem] bg-white p-1.5 pb-5 shadow-[0_24px_65px_rgba(112,62,70,0.28)] ring-1 ring-white/80 sm:rounded-[1.35rem] sm:p-2 sm:pb-7">
        <span className="absolute left-1/2 top-[-0.6rem] z-20 h-5 w-16 -translate-x-1/2 rotate-[-3deg] rounded-sm bg-[#fff0c9]/82 shadow-[0_8px_18px_rgba(135,88,66,0.13)] backdrop-blur-sm sm:h-6 sm:w-20" />
        <div className="relative h-full w-full overflow-hidden rounded-[0.8rem] bg-[#f6ddd9] sm:rounded-[1rem]">
          <Image
            fill
            alt={alt}
            className="object-cover"
            quality={72}
            sizes={sizes}
            src={src}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_58%,rgba(93,55,53,0.12))]" />
        </div>
      </div>
    </motion.div>
  );
}

function GiftBoxButton({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <Link
      aria-label="Open the birthday surprise"
      className="group mt-9 inline-flex rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ffb3c7]/55"
      href="/surprise"
    >
      <motion.span
        className="relative inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/78 px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-[#8b5b58] shadow-[0_20px_55px_rgba(198,102,123,0.2)] backdrop-blur-xl transition-shadow group-hover:shadow-[0_24px_75px_rgba(255,145,174,0.34)] sm:px-5"
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -7, 0],
              }
        }
        transition={{
          duration: 2.6,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        whileHover={{ scale: 1.045 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="relative grid h-12 w-12 place-items-center">
          <span className="absolute bottom-1 h-8 w-10 rounded-[0.55rem] border border-white/80 bg-gradient-to-br from-[#ff9fbb] via-[#ffbfd0] to-[#f2a46d] shadow-[0_14px_28px_rgba(184,91,108,0.25)]" />
          <span className="absolute top-2 h-3.5 w-12 rounded-md border border-white/80 bg-gradient-to-r from-[#ffc6d7] via-[#fff0f4] to-[#ffb3c9]" />
          <span className="absolute bottom-1 h-8 w-2 rounded-full bg-white/82" />
          <span className="absolute bottom-[1.55rem] h-2 w-10 rounded-full bg-white/55" />
          <span className="absolute left-2 top-0 h-4 w-5 -rotate-12 rounded-full border-[3px] border-[#ff9fbb] bg-transparent" />
          <span className="absolute right-2 top-0 h-4 w-5 rotate-12 rounded-full border-[3px] border-[#ff9fbb] bg-transparent" />
        </span>
        <span className="hidden sm:inline">open surprise</span>
        <span className="sm:hidden">surprise</span>
      </motion.span>
    </Link>
  );
}

export default function FinalReveal() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      aria-label="Birthday ending message"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-24 text-center sm:px-8"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.94),transparent_30%),linear-gradient(180deg,#fff8ee_0%,#ffeef4_48%,#fff9f7_100%)]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffc3d4]/34 blur-3xl" />
      <div className="absolute bottom-[-10rem] right-[-8rem] -z-10 h-80 w-80 rounded-full bg-[#ffe2aa]/48 blur-3xl" />

      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          aria-hidden="true"
          className="absolute rounded-full shadow-[0_0_20px_rgba(255,255,255,0.85)]"
          style={{
            backgroundColor: particle.color,
            height: particle.size,
            left: particle.left,
            top: particle.top,
            width: particle.size,
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  opacity: [0.35, 1, 0.35],
                  scale: [1, 1.25, 1],
                  y: [0, -16, 0],
                }
          }
          transition={{
            delay: particle.delay,
            duration: 4.2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      ))}

      <div className="relative mx-auto w-full max-w-6xl pb-16 pt-16 sm:pb-20 sm:pt-20">
        {stickerPhotos.map((photo) => (
          <StickerPhoto
            key={photo.src}
            alt={photo.alt}
            className={photo.className}
            delay={photo.delay}
            reducedMotion={reducedMotion}
            rotate={photo.rotate}
            sizes={photo.sizes}
            src={photo.src}
          />
        ))}

        <motion.div
          className="relative z-10 mx-auto max-w-5xl rounded-[2.5rem] border border-white/75 bg-white/72 px-6 pb-14 pt-20 shadow-[0_36px_110px_rgba(196,105,124,0.22)] backdrop-blur-xl sm:rounded-[3.5rem] sm:px-12 sm:py-16 lg:px-16"
          initial={reducedMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative z-20 mx-auto max-w-4xl">
            <p className="mx-auto mb-5 w-fit rounded-full bg-[#fff0f4] px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-[#bb7a83]">
              final reveal
            </p>
            <h2 className="text-balance text-4xl font-black leading-[1.08] tracking-[-0.06em] text-[#5e4643] sm:text-6xl lg:text-7xl">
              Lesgoooo… 25 years of memories, madness, love, and beautiful chaos
              — and still so much more to go 💖✨
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-8 text-[#8a6460] sm:text-lg">
              Here is to softer days, louder laughs, bigger dreams, and many
              more iconic chapters waiting to happen.
            </p>

            <GiftBoxButton reducedMotion={reducedMotion} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
