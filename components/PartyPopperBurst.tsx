"use client";

import { motion, useReducedMotion } from "motion/react";

const confetti = [
  { x: -220, y: -170, rotate: 240, color: "#ff8dad", shape: "rounded-sm" },
  { x: -170, y: -230, rotate: -180, color: "#ffe07c", shape: "rounded-full" },
  { x: -110, y: -205, rotate: 120, color: "#9bd7ff", shape: "rounded-sm" },
  { x: -60, y: -250, rotate: -260, color: "#ffc6d7", shape: "rounded-full" },
  { x: 20, y: -230, rotate: 210, color: "#f4aa65", shape: "rounded-sm" },
  { x: 92, y: -210, rotate: -160, color: "#ff8dad", shape: "rounded-full" },
  { x: 150, y: -240, rotate: 190, color: "#ffe07c", shape: "rounded-sm" },
  { x: 220, y: -165, rotate: -220, color: "#9bd7ff", shape: "rounded-full" },
  { x: -250, y: -75, rotate: -140, color: "#f4aa65", shape: "rounded-sm" },
  { x: -145, y: -110, rotate: 260, color: "#ffb3c9", shape: "rounded-full" },
  { x: -25, y: -150, rotate: -210, color: "#ffe07c", shape: "rounded-sm" },
  { x: 118, y: -112, rotate: 180, color: "#9bd7ff", shape: "rounded-full" },
  { x: 248, y: -78, rotate: -260, color: "#ff8dad", shape: "rounded-sm" },
] as const;

type PartyPopperBurstProps = {
  active: boolean;
};

export default function PartyPopperBurst({ active }: PartyPopperBurstProps) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      <motion.div
        className="absolute left-1/2 top-[48%] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow-[0_0_70px_rgba(255,196,214,0.9)]"
        initial={{ opacity: 0, scale: 0.2 }}
        animate={
          active
            ? { opacity: [0, 1, 0], scale: reducedMotion ? [0.8, 1] : [0.2, 8] }
            : { opacity: 0, scale: 0.2 }
        }
        transition={{ duration: reducedMotion ? 0.28 : 0.72, ease: "easeOut" }}
      />

      {confetti.map((piece, index) => (
        <motion.span
          key={`${piece.x}-${piece.y}`}
          className={`absolute left-1/2 top-[48%] h-3 w-6 ${piece.shape}`}
          style={{ backgroundColor: piece.color }}
          initial={{ opacity: 0, scale: 0.4, x: 0, y: 0, rotate: 0 }}
          animate={
            active
              ? {
                  opacity: [0, 1, 1, 0],
                  scale: [0.4, 1, 0.9],
                  x: reducedMotion ? piece.x * 0.25 : piece.x,
                  y: reducedMotion ? piece.y * 0.25 : piece.y,
                  rotate: piece.rotate,
                }
              : { opacity: 0, scale: 0.4, x: 0, y: 0, rotate: 0 }
          }
          transition={{
            delay: 0.05 + index * 0.018,
            duration: reducedMotion ? 0.35 : 1.05,
            ease: [0.17, 0.67, 0.23, 0.99],
          }}
        />
      ))}

      <motion.div
        className="absolute bottom-[14%] left-[8%] h-16 w-20 rotate-[-24deg] rounded-b-2xl bg-gradient-to-br from-[#ffd36a] to-[#ff8dad] shadow-[0_18px_40px_rgba(146,70,84,0.18)] sm:left-[18%]"
        initial={{ opacity: 0, scale: 0.8, y: 18 }}
        animate={
          active
            ? { opacity: [0, 1, 1, 0], scale: 1, y: 0 }
            : { opacity: 0, scale: 0.8, y: 18 }
        }
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-[14%] right-[8%] h-16 w-20 rotate-[24deg] rounded-b-2xl bg-gradient-to-bl from-[#9bd7ff] to-[#ff8dad] shadow-[0_18px_40px_rgba(146,70,84,0.18)] sm:right-[18%]"
        initial={{ opacity: 0, scale: 0.8, y: 18 }}
        animate={
          active
            ? { opacity: [0, 1, 1, 0], scale: 1, y: 0 }
            : { opacity: 0, scale: 0.8, y: 18 }
        }
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </div>
  );
}
