"use client";

import { motion, useReducedMotion } from "motion/react";

type CurtainRevealProps = {
  onOpened: () => void;
};

export default function CurtainReveal({ onOpened }: CurtainRevealProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const curtainTransition = {
    delay: reducedMotion ? 0.15 : 0.65,
    duration: reducedMotion ? 0.45 : 1.85,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 origin-left bg-[repeating-linear-gradient(90deg,#ff9db9_0px,#ffc0d0_18px,#ff89ab_36px,#ffd6df_54px)] shadow-[18px_0_60px_rgba(128,52,74,0.22)]"
        initial={{ x: 0 }}
        animate={{ x: reducedMotion ? "-78%" : "-78%" }}
        transition={curtainTransition}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_12%,rgba(255,255,255,0.36),transparent_26%),linear-gradient(90deg,rgba(116,38,60,0.18),transparent_35%,rgba(255,255,255,0.2))]" />
        <div className="absolute right-0 top-0 h-full w-5 bg-white/30 shadow-[0_0_24px_rgba(255,255,255,0.36)]" />
        <div className="absolute right-5 top-1/2 h-20 w-9 -translate-y-1/2 rounded-full bg-[#fff0c9]/75 shadow-[0_12px_30px_rgba(127,63,70,0.18)]" />
      </motion.div>

      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 origin-right bg-[repeating-linear-gradient(90deg,#ffd6df_0px,#ff89ab_18px,#ffc0d0_36px,#ff9db9_54px)] shadow-[-18px_0_60px_rgba(128,52,74,0.2)]"
        initial={{ x: 0 }}
        animate={{ x: reducedMotion ? "78%" : "78%" }}
        transition={curtainTransition}
        onAnimationComplete={onOpened}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_12%,rgba(255,255,255,0.36),transparent_26%),linear-gradient(270deg,rgba(116,38,60,0.18),transparent_35%,rgba(255,255,255,0.2))]" />
        <div className="absolute left-0 top-0 h-full w-5 bg-white/30 shadow-[0_0_24px_rgba(255,255,255,0.36)]" />
        <div className="absolute left-5 top-1/2 h-20 w-9 -translate-y-1/2 rounded-full bg-[#fff0c9]/75 shadow-[0_12px_30px_rgba(127,63,70,0.18)]" />
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-0 h-20 w-[110vw] -translate-x-1/2 rounded-b-[50%] bg-gradient-to-b from-[#ff87aa] to-[#ffc0d0] shadow-[0_20px_70px_rgba(138,54,78,0.2)] sm:h-24"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 0.88 }}
        transition={{
          delay: reducedMotion ? 0.18 : 0.8,
          duration: reducedMotion ? 0.4 : 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-white/40 shadow-[0_0_70px_rgba(255,255,255,0.7)] backdrop-blur"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{
          delay: reducedMotion ? 0.2 : 0.78,
          duration: reducedMotion ? 0.4 : 0.95,
          ease: "easeOut",
        }}
      />
    </div>
  );
}
