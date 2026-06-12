import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

export function FinalSurprise({ intro, cta, reveal1, reveal2 }: { intro: string; cta: string; reveal1: string; reveal2: string }) {
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  const launchFireworks = () => {
    setStage(1);
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ["#f5d6a8", "#f7c5d0", "#e8a87c", "#d4b8e8", "#fff5e1"];
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors });
      confetti({ particleCount: 6, startVelocity: 35, spread: 360, ticks: 80, origin: { x: Math.random(), y: Math.random() * 0.5 }, colors, scalar: 1.2 });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    setTimeout(() => setStage(2), 4500);
  };

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="glass rounded-3xl p-10 md:p-16 text-center shadow-luxury"
        >
          <p className="text-pearl/60 text-xs uppercase tracking-[0.5em] mb-8">One More Thing</p>
          <p className="font-display italic text-2xl md:text-3xl text-pearl/90 leading-relaxed whitespace-pre-line mb-10">
            {intro}
          </p>
          <motion.button
            onClick={launchFireworks}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full px-8 py-4 text-sm md:text-base uppercase tracking-[0.3em] text-background shadow-luxury"
            style={{ background: "var(--gradient-gold)" }}
          >
            {cta}
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {stage >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center px-6 text-center"
            style={{ background: "radial-gradient(ellipse at center, oklch(0.3 0.08 330 / 0.95), oklch(0.1 0.02 320 / 0.98))" }}
          >
            <AnimatePresence mode="wait">
              {stage === 1 && (
                <motion.h2
                  key="r1"
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -20 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl md:text-7xl text-gold max-w-3xl leading-tight"
                  style={{ textShadow: "0 0 80px oklch(0.92 0.08 85 / 0.6)" }}
                >
                  {reveal1}
                </motion.h2>
              )}
              {stage === 2 && (
                <motion.h2
                  key="r2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.6 }}
                  className="font-display italic text-3xl md:text-6xl text-pearl max-w-3xl leading-tight"
                  style={{ textShadow: "0 0 80px oklch(0.92 0.08 85 / 0.5)" }}
                >
                  {reveal2}
                </motion.h2>
              )}
            </AnimatePresence>
            {/* Floating hearts */}
            {[...Array(14)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ y: "100vh", opacity: 0 }}
                animate={{ y: "-20vh", opacity: [0, 1, 0] }}
                transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: i * 0.5 }}
                className="absolute text-3xl pointer-events-none"
                style={{ left: `${5 + i * 7}%`, color: "oklch(0.82 0.09 25 / 0.7)", filter: "drop-shadow(0 0 12px currentColor)" }}
              >
                ♥
              </motion.span>
            ))}
            <button
              onClick={() => setStage(0)}
              className="absolute top-6 right-6 glass rounded-full w-10 h-10 text-pearl/80 hover:text-pearl"
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
