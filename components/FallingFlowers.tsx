"use client";

import { motion, useReducedMotion } from "motion/react";

const flowers = [
  { left: "2%", size: 24, delay: -8.2, duration: 12.5, sway: 26, color: "#ffc8d8" },
  { left: "5%", size: 18, delay: -2.4, duration: 9.8, sway: -18, color: "#fff0bd" },
  { left: "8%", size: 26, delay: -5.7, duration: 13.2, sway: 24, color: "#ffffff" },
  { left: "12%", size: 20, delay: -0.8, duration: 10.6, sway: -22, color: "#ffd9e5" },
  { left: "16%", size: 28, delay: -7.1, duration: 14, sway: 34, color: "#ffc6d4" },
  { left: "20%", size: 16, delay: -3.3, duration: 9.4, sway: -16, color: "#ffe7aa" },
  { left: "24%", size: 23, delay: -9.1, duration: 12.1, sway: 22, color: "#ffe0ea" },
  { left: "28%", size: 19, delay: -1.5, duration: 10.2, sway: -24, color: "#ffffff" },
  { left: "32%", size: 27, delay: -6.2, duration: 13.5, sway: 30, color: "#ffc8d8" },
  { left: "36%", size: 17, delay: -4.8, duration: 9.9, sway: -18, color: "#fff0bd" },
  { left: "40%", size: 24, delay: -10.4, duration: 14.4, sway: 26, color: "#ffd9e5" },
  { left: "44%", size: 18, delay: -2.9, duration: 10.8, sway: -20, color: "#ffffff" },
  { left: "48%", size: 30, delay: -7.7, duration: 15.2, sway: 32, color: "#ffe0ea" },
  { left: "52%", size: 16, delay: -0.5, duration: 9.6, sway: -16, color: "#ffc6d4" },
  { left: "56%", size: 25, delay: -5.2, duration: 12.8, sway: 22, color: "#ffe7aa" },
  { left: "60%", size: 20, delay: -8.8, duration: 11.4, sway: -26, color: "#ffffff" },
  { left: "64%", size: 28, delay: -3.7, duration: 14.2, sway: 30, color: "#ffc8d8" },
  { left: "68%", size: 18, delay: -6.8, duration: 10.4, sway: -18, color: "#fff0bd" },
  { left: "72%", size: 24, delay: -1.8, duration: 12.3, sway: 24, color: "#ffd9e5" },
  { left: "76%", size: 17, delay: -9.8, duration: 9.7, sway: -20, color: "#ffe0ea" },
  { left: "80%", size: 27, delay: -4.1, duration: 13.8, sway: 32, color: "#ffffff" },
  { left: "84%", size: 19, delay: -7.4, duration: 10.7, sway: -22, color: "#ffc6d4" },
  { left: "88%", size: 25, delay: -2.1, duration: 12.9, sway: 28, color: "#ffe7aa" },
  { left: "92%", size: 18, delay: -5.9, duration: 10.1, sway: -18, color: "#ffd9e5" },
  { left: "96%", size: 29, delay: -8.6, duration: 14.8, sway: 26, color: "#ffffff" },
] as const;

function FlowerShape({ color, size }: { color: string; size: number }) {
  return (
    <svg
      className="block drop-shadow-[0_8px_10px_rgba(171,84,102,0.18)]"
      fill="none"
      height={size}
      viewBox="0 0 40 40"
      width={size}
    >
      <ellipse cx="20" cy="9" fill={color} rx="6.4" ry="9" stroke="#fff7f4" strokeWidth="1.5" />
      <ellipse cx="20" cy="31" fill={color} rx="6.4" ry="9" stroke="#fff7f4" strokeWidth="1.5" />
      <ellipse cx="9" cy="20" fill={color} rx="9" ry="6.4" stroke="#fff7f4" strokeWidth="1.5" />
      <ellipse cx="31" cy="20" fill={color} rx="9" ry="6.4" stroke="#fff7f4" strokeWidth="1.5" />
      <circle cx="20" cy="20" fill="#f4aa65" r="5.2" stroke="#fff5c8" strokeWidth="1.5" />
    </svg>
  );
}

export default function FallingFlowers() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      {flowers.map((flower, index) => (
        <motion.span
          key={`${flower.left}-${flower.delay}`}
          className="absolute -top-12"
          style={{ left: flower.left }}
          animate={
            reducedMotion
              ? { opacity: 0.7, y: "22vh" }
              : {
                  opacity: [0, 1, 1, 0],
                  rotate: [0, index % 2 === 0 ? 180 : -180, 360],
                  x: [0, flower.sway, flower.sway * -0.35, 0],
                  y: ["-12vh", "116vh"],
                }
          }
          transition={{
            delay: flower.delay,
            duration: flower.duration,
            ease: "linear",
            repeat: reducedMotion ? 0 : Infinity,
          }}
        >
          <FlowerShape color={flower.color} size={flower.size} />
        </motion.span>
      ))}
    </div>
  );
}
