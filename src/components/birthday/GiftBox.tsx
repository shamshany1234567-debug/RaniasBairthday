import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

interface Props {
  tagline: string;
  cta: string;
  onOpen: () => void;
}

export function GiftBox({ tagline, cta, onOpen }: Props) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        origin: { y: 0.5 },
        particleCount: Math.floor(260 * particleRatio),
        colors: ["#f5d6a8", "#f7c5d0", "#e8a87c", "#d4b8e8", "#fff5e1"],
        ...opts,
      });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.9 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
    setTimeout(onOpen, 1800);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--gradient-luxury)" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: opening ? 0 : 1 }}
      transition={{ duration: 1.4, delay: opening ? 1.1 : 0 }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, oklch(0.85 0.12 35 / 0.25), transparent 55%)",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1.2 }}
        className="font-display text-2xl md:text-4xl text-pearl/90 mb-14 max-w-xl italic relative z-10"
      >
        {tagline}
      </motion.p>

      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-20"
        style={{ perspective: 1000 }}
      >
        {/* Halo */}
        <motion.div
          className="absolute inset-0 -m-16 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.92 0.1 75 / 0.35), transparent 65%)",
            filter: "blur(20px)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating box */}
        <motion.div
          className="relative w-52 h-52 md:w-64 md:h-64"
          animate={opening ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Shadow on ground */}
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-44 h-6 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, oklch(0 0 0 / 0.55), transparent 70%)",
              filter: "blur(8px)",
            }}
            animate={opening ? {} : { scaleX: [1, 0.85, 1], opacity: [0.7, 0.5, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Box body */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[62%] rounded-[20px] overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, oklch(0.32 0.06 340) 0%, oklch(0.22 0.05 330) 60%, oklch(0.16 0.04 320) 100%)",
              boxShadow:
                "0 30px 60px -15px oklch(0 0 0 / 0.6), inset 0 1px 0 oklch(1 0 0 / 0.15), inset 0 0 40px oklch(0 0 0 / 0.4)",
              border: "1px solid oklch(1 0 0 / 0.08)",
            }}
            animate={opening ? { y: [0, -4, 0] } : {}}
          >
            {/* Inner light when opening */}
            <AnimatePresence>
              {opening && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at top, oklch(0.98 0.1 85 / 0.9), transparent 70%)",
                  }}
                />
              )}
            </AnimatePresence>

            {/* Gold rim */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "var(--gradient-gold)" }}
            />

            {/* Vertical ribbon */}
            <div
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-7"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.7 0.13 35) 0%, oklch(0.92 0.1 75) 50%, oklch(0.7 0.13 35) 100%)",
                boxShadow: "0 0 20px oklch(0.92 0.1 75 / 0.5)",
              }}
            />

            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background:
                  "linear-gradient(115deg, transparent 30%, oklch(1 0 0 / 0.25) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["200% 0", "-100% 0"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Horizontal ribbon (on lid) */}
          <motion.div
            className="absolute inset-x-[-8px] top-0 h-[38%] rounded-[20px] overflow-hidden origin-bottom"
            style={{
              background:
                "linear-gradient(160deg, oklch(0.36 0.07 340) 0%, oklch(0.24 0.05 330) 100%)",
              boxShadow:
                "0 12px 24px -8px oklch(0 0 0 / 0.6), inset 0 1px 0 oklch(1 0 0 / 0.2)",
              border: "1px solid oklch(1 0 0 / 0.1)",
            }}
            animate={
              opening
                ? { y: -120, rotateZ: -14, x: -10, opacity: 0 }
                : {}
            }
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Gold trim on lid edge */}
            <div
              className="absolute inset-x-0 bottom-0 h-px"
              style={{ background: "var(--gradient-gold)" }}
            />
            {/* Ribbon strip */}
            <div
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-7"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.7 0.13 35) 0%, oklch(0.92 0.1 75) 50%, oklch(0.7 0.13 35) 100%)",
                boxShadow: "0 0 20px oklch(0.92 0.1 75 / 0.5)",
              }}
            />
            {/* Lid shimmer */}
            <motion.div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background:
                  "linear-gradient(115deg, transparent 30%, oklch(1 0 0 / 0.3) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["200% 0", "-100% 0"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Bow — elegant SVG */}
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2"
            animate={
              opening
                ? { y: -140, opacity: 0, rotate: 35, scale: 0.8 }
                : { y: [0, -3, 0] }
            }
            transition={
              opening
                ? { duration: 1, ease: [0.16, 1, 0.3, 1] }
                : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
            }
            style={{
              filter:
                "drop-shadow(0 4px 12px oklch(0 0 0 / 0.5)) drop-shadow(0 0 16px oklch(0.92 0.1 75 / 0.6))",
            }}
          >
            <svg width="88" height="56" viewBox="0 0 88 56" fill="none">
              <defs>
                <linearGradient id="bowGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.95 0.08 75)" />
                  <stop offset="50%" stopColor="oklch(0.82 0.12 50)" />
                  <stop offset="100%" stopColor="oklch(0.62 0.14 30)" />
                </linearGradient>
                <linearGradient id="bowGrad2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.88 0.1 65)" />
                  <stop offset="100%" stopColor="oklch(0.55 0.13 30)" />
                </linearGradient>
              </defs>
              {/* Left loop */}
              <path
                d="M44 30 C 20 14, 6 22, 6 36 C 6 48, 26 48, 44 34 Z"
                fill="url(#bowGrad)"
                stroke="oklch(0.6 0.12 30 / 0.6)"
                strokeWidth="0.8"
              />
              {/* Right loop */}
              <path
                d="M44 30 C 68 14, 82 22, 82 36 C 82 48, 62 48, 44 34 Z"
                fill="url(#bowGrad)"
                stroke="oklch(0.6 0.12 30 / 0.6)"
                strokeWidth="0.8"
              />
              {/* Center knot */}
              <ellipse
                cx="44"
                cy="32"
                rx="7"
                ry="9"
                fill="url(#bowGrad2)"
                stroke="oklch(0.55 0.13 30 / 0.7)"
                strokeWidth="0.8"
              />
              {/* Highlight */}
              <ellipse cx="42" cy="29" rx="2" ry="3" fill="oklch(1 0 0 / 0.5)" />
            </svg>
          </motion.div>

          {/* Glow burst on open */}
          <AnimatePresence>
            {opening && (
              <>
                <motion.div
                  initial={{ scale: 0, opacity: 0.95 }}
                  animate={{ scale: 7, opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, oklch(0.97 0.12 80 / 0.85), transparent 60%)",
                  }}
                />
                {/* Light rays from inside box */}
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.4 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-1/3 w-40 h-80 origin-bottom pointer-events-none"
                  style={{
                    background:
                      "conic-gradient(from 270deg at 50% 100%, transparent 0deg, oklch(0.97 0.12 80 / 0.7) 30deg, transparent 60deg, oklch(0.97 0.12 80 / 0.5) 90deg, transparent 120deg)",
                    filter: "blur(2px)",
                  }}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        onClick={handleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="glass rounded-full px-10 py-4 text-base md:text-lg tracking-[0.25em] uppercase text-pearl shadow-luxury relative z-10"
      >
        {cta}
      </motion.button>
    </motion.div>
  );
}
