"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import BirthdayCake from "./BirthdayCake";
import CurtainReveal from "./CurtainReveal";
import FallingFlowers from "./FallingFlowers";
import PartyPopperBurst from "./PartyPopperBurst";

const revealTransition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function SurpriseScene() {
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (!isCurtainOpen) {
      return;
    }

    const timer = window.setTimeout(
      () => setShowContent(true),
      reducedMotion ? 160 : 620,
    );

    return () => window.clearTimeout(timer);
  }, [isCurtainOpen, reducedMotion]);

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-[#fff8f4] px-5 py-10 text-center text-[#654947] sm:px-8 sm:py-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.95),transparent_31%),radial-gradient(circle_at_18%_72%,rgba(255,210,223,0.46),transparent_28%),linear-gradient(135deg,#fffafd_0%,#fff0f4_45%,#fff8ed_100%)]" />
      <div className="absolute left-[-9rem] top-[-8rem] -z-10 h-96 w-96 rounded-full bg-[#ffd2df]/55 blur-3xl" />
      <div className="absolute bottom-[-12rem] right-[-8rem] -z-10 h-[34rem] w-[34rem] rounded-full bg-[#ffe0aa]/50 blur-3xl" />

      <FallingFlowers />
      <PartyPopperBurst active={isCurtainOpen && !showContent} />

      <motion.section
        className="relative z-20 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col items-center justify-center"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.88 }}
        animate={{
          opacity: showContent ? 1 : 0,
          scale: showContent ? 1 : 0.88,
        }}
        transition={{ duration: reducedMotion ? 0.2 : 0.62, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="mb-4 rounded-full border border-white/80 bg-white/62 px-4 py-2 text-xs font-black uppercase tracking-[0.3em] text-[#bb7a83] shadow-[0_18px_55px_rgba(211,132,151,0.16)] backdrop-blur"
          initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.92 }}
          animate={
            showContent
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 18, scale: 0.92 }
          }
          transition={{ ...revealTransition, delay: 0.12 }}
        >
          today is all about you
        </motion.p>

        <motion.h1
          className="max-w-6xl text-balance text-[clamp(2.6rem,9vw,7.8rem)] font-black leading-[0.9] tracking-[-0.08em] text-[#5e4643] drop-shadow-[0_18px_50px_rgba(196,105,124,0.18)]"
          initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.78 }}
          animate={
            showContent
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 20, scale: 0.78 }
          }
          transition={{ ...revealTransition, delay: 0.28 }}
        >
          HAPPPPPYYYYY BIRTHDAYYYY DIII DIII BHAIII
        </motion.h1>

        <div className="mt-9 grid w-full max-w-5xl items-center gap-8 sm:mt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <motion.div
            className="relative mx-auto w-full max-w-xs rotate-[-2deg] rounded-[2rem] bg-white p-2 pb-8 shadow-[0_30px_90px_rgba(112,62,70,0.24)] ring-1 ring-white/80 sm:max-w-sm"
            initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.72 }}
            animate={
              showContent
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 18, scale: 0.72 }
            }
            transition={{ ...revealTransition, delay: 0.62 }}
          >
            <span className="absolute left-1/2 top-[-0.75rem] z-20 h-6 w-24 -translate-x-1/2 rotate-[-3deg] rounded-sm bg-[#fff0c9]/82 shadow-[0_8px_18px_rgba(135,88,66,0.13)] backdrop-blur-sm" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.45rem] bg-[#f6ddd9]">
              <Image
                fill
                alt="Dii Dii Bhai birthday portrait"
                className="object-cover"
                preload
                quality={82}
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 360px, 380px"
                src="/DIIDIIBHAI.jpg"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_56%,rgba(93,55,53,0.13))]" />
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-[2.4rem] border border-white/70 bg-white/46 px-4 py-7 shadow-[0_30px_90px_rgba(196,105,124,0.14)] backdrop-blur-xl sm:px-8"
            initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.72 }}
            animate={
              showContent
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 18, scale: 0.72 }
            }
            transition={{ ...revealTransition, delay: 0.78 }}
          >
            <BirthdayCake />
          </motion.div>
        </div>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ ...revealTransition, delay: 1.05 }}
        >
          <Link
            className="inline-flex rounded-full border border-white/70 bg-white/46 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#a87973] shadow-[0_18px_50px_rgba(198,102,123,0.11)] transition hover:scale-[1.03] hover:bg-white/65 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ffb3c7]/55"
            href="/"
          >
            back to memories
          </Link>
        </motion.div>
      </motion.section>

      <CurtainReveal onOpened={() => setIsCurtainOpen(true)} />
    </main>
  );
}
