"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

const pawPrints = [
  { left: "16%", top: "25%", scale: 0.78, rotate: -12 },
  { left: "34%", top: "54%", scale: 0.62, rotate: 10 },
  { left: "55%", top: "29%", scale: 0.72, rotate: 8 },
  { left: "73%", top: "57%", scale: 0.58, rotate: -8 },
  { left: "84%", top: "24%", scale: 0.52, rotate: 13 },
] as const;

function PawPrint({
  left,
  rotate,
  scale,
  top,
}: {
  left: string;
  rotate: number;
  scale: number;
  top: string;
}) {
  return (
    <span
      aria-hidden="true"
      className="absolute h-9 w-9"
      style={{ left, top, transform: `rotate(${rotate}deg) scale(${scale})` }}
    >
      <span className="absolute bottom-1 left-1/2 h-4 w-5 -translate-x-1/2 rounded-[50%] bg-[#6d3f32]/82" />
      <span className="absolute left-1 top-1 h-2.5 w-2.5 rounded-full bg-[#6d3f32]/82" />
      <span className="absolute left-3.5 top-0 h-2.5 w-2.5 rounded-full bg-[#6d3f32]/82" />
      <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-[#6d3f32]/82" />
    </span>
  );
}

function NumberCandle({
  delay,
  isOut,
  value,
}: {
  delay: number;
  isOut: boolean;
  value: string;
}) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <span className="relative inline-flex h-24 w-14 items-end justify-center">
      <motion.span
        className="absolute top-0 h-7 w-5 rounded-full bg-gradient-to-b from-[#fff7a8] via-[#ffbd58] to-[#ff7f65] shadow-[0_0_26px_rgba(255,176,77,0.85)]"
        animate={
          isOut
            ? { opacity: 0, scale: 0.15, y: -12 }
            : reducedMotion
              ? { opacity: 1, scale: 1, y: 0 }
              : {
                  opacity: 1,
                  scale: [1, 1.1, 0.96, 1],
                  rotate: [-2, 2, -1],
                  y: 0,
                }
        }
        transition={{
          delay,
          duration: isOut ? 0.35 : 1.1,
          ease: "easeInOut",
          repeat: isOut || reducedMotion ? 0 : Infinity,
        }}
      />

      {[0, 1, 2].map((puff) => (
        <motion.span
          key={puff}
          aria-hidden="true"
          className="absolute top-1 h-3 w-3 rounded-full bg-white/80 blur-[1px]"
          initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
          animate={
            isOut
              ? {
                  opacity: [0, 0.75, 0],
                  scale: [0.3, 1.2, 1.8],
                  x: (puff - 1) * 10,
                  y: [-2, -24 - puff * 8],
                }
              : { opacity: 0, scale: 0.3, x: 0, y: 0 }
          }
          transition={{
            delay: 0.06 + puff * 0.12,
            duration: reducedMotion ? 0.3 : 1.15,
            ease: "easeOut",
          }}
        />
      ))}

      <motion.span
        className="relative z-10 bg-gradient-to-b from-[#fff0f4] via-[#ffc3d3] to-[#ff8faf] bg-clip-text text-7xl font-black leading-none text-transparent drop-shadow-[0_12px_18px_rgba(121,61,67,0.18)]"
        style={{ WebkitTextStroke: "1.4px rgba(121, 61, 67, 0.2)" }}
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -3, 0],
              }
        }
        transition={{
          delay,
          duration: 2.4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        {value}
      </motion.span>
      <span className="absolute bottom-0 h-4 w-2 rounded-full bg-[#7b3f31]/80" />
    </span>
  );
}

export default function BirthdayCake() {
  const [candlesOut, setCandlesOut] = useState(false);
  const router = useRouter();
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (!candlesOut) {
      return;
    }

    const redirectTimer = window.setTimeout(() => {
      router.push("/chonka");
    }, 1000);

    return () => window.clearTimeout(redirectTimer);
  }, [candlesOut, router]);

  const extinguishCandles = () => {
    setCandlesOut(true);
  };

  return (
    <motion.div
      className="relative mx-auto mt-8 w-full max-w-[21rem] sm:mt-0"
      initial={reducedMotion ? false : { opacity: 0, y: 28, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mx-auto mb-2 w-fit rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.16em] text-[#9a6963] shadow-[0_12px_32px_rgba(122,64,52,0.1)]">
        {candlesOut ? "wish made... opening chonka love" : "tap the cake to blow candles"}
      </p>

      <div className="relative mx-auto h-72">
        <div className="absolute left-1/2 top-0 z-20 flex -translate-x-1/2 items-end gap-1">
          <NumberCandle delay={0} isOut={candlesOut} value="2" />
          <NumberCandle delay={0.22} isOut={candlesOut} value="5" />
        </div>

        <div className="absolute left-1/2 top-[5.9rem] h-16 w-56 -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-[#8b4b38] to-[#653226] shadow-[0_18px_34px_rgba(99,52,42,0.18)] sm:w-64" />

        <div
          aria-label="Birthday cake. Touch to blow out the candles."
          className="absolute left-1/2 top-28 h-28 w-64 -translate-x-1/2 cursor-pointer overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#7a3f30] via-[#6c3429] to-[#52271f] shadow-[0_30px_80px_rgba(91,48,43,0.22)] outline-none focus-visible:ring-4 focus-visible:ring-[#ffb3c7]/55 sm:w-72"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              extinguishCandles();
            }
          }}
          onPointerDown={extinguishCandles}
          role="button"
          tabIndex={0}
        >
          <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#9b5a43] to-[#7a3f30]" />
          <div className="absolute left-0 top-7 h-7 w-12 rounded-b-full bg-[#4b241d]" />
          <div className="absolute left-14 top-7 h-10 w-16 rounded-b-full bg-[#4b241d]" />
          <div className="absolute left-36 top-7 h-8 w-14 rounded-b-full bg-[#4b241d]" />
          <div className="absolute right-3 top-7 h-11 w-16 rounded-b-full bg-[#4b241d]" />
          <div className="absolute inset-x-6 top-16 h-px bg-white/14" />

          {pawPrints.map((paw) => (
            <PawPrint
              key={`${paw.left}-${paw.top}`}
              left={paw.left}
              rotate={paw.rotate}
              scale={paw.scale}
              top={paw.top}
            />
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 h-8 w-72 -translate-x-1/2 rounded-[50%] bg-[#f6d6c8] shadow-[0_18px_42px_rgba(122,64,52,0.16)] sm:w-80" />
        <div className="absolute bottom-7 left-1/2 h-5 w-64 -translate-x-1/2 rounded-full bg-white/35 blur-md" />
      </div>
    </motion.div>
  );
}
