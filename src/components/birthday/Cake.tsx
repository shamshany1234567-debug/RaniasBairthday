import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

type Stage = "idle" | "lit" | "wish" | "blown" | "cut";

export function Cake({ messages }: { messages: { light: string; wish: string; blow: string; cut: string } }) {
  const [stage, setStage] = useState<Stage>("idle");
  const [message, setMessage] = useState<string>("");
  const [sliced, setSliced] = useState(false);

  const light = () => {
    setStage("lit");
    setMessage(messages.light);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 }, colors: ["#f5d6a8", "#ffeacc"], scalar: 0.7 });
  };
  const wish = () => setMessage(messages.wish);
  const blow = () => {
    setStage("blown");
    setMessage(messages.blow);
  };
  const cut = () => {
    setStage("cut");
    setSliced(true);
    setMessage(messages.cut);
    confetti({ particleCount: 180, spread: 100, origin: { y: 0.55 }, colors: ["#f7c5d0", "#f5d6a8", "#d4b8e8"] });
  };

  const candleLit = stage === "lit" || stage === "wish";

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl text-gold mb-4"
        >
          Make A Wish
        </motion.h2>
        <p className="text-pearl/60 text-sm uppercase tracking-[0.4em] mb-16">An interactive moment</p>

        {/* Cake */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative mx-auto w-72 md:w-96 h-72 md:h-96 mb-12"
          animate={candleLit ? { filter: "drop-shadow(0 0 60px oklch(0.92 0.15 60 / 0.6))" } : {}}
        >
          {/* Candles */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-6 z-10">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <AnimatePresence>
                  {candleLit && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0, y: -20 }}
                      className="w-3 h-5 rounded-full animate-flicker"
                      style={{
                        background: "radial-gradient(circle at 50% 70%, #fff 0%, #ffd97a 40%, #ff8a3d 100%)",
                        boxShadow: "0 0 20px #ffaa44, 0 0 40px #ff8a3d",
                      }}
                    />
                  )}
                  {stage === "blown" && (
                    <motion.div
                      initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                      animate={{ opacity: 0, y: -60, scale: 2 }}
                      transition={{ duration: 2 }}
                      className="absolute w-4 h-4 rounded-full bg-pearl/30 blur-md"
                    />
                  )}
                </AnimatePresence>
                <div className="w-2 h-12 rounded-sm" style={{ background: "linear-gradient(180deg, #f7c5d0, #e8a87c)" }} />
              </div>
            ))}
          </div>

          {/* Top tier */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-44 h-20 rounded-2xl shadow-luxury overflow-hidden" style={{ background: "linear-gradient(180deg, #fff5e1 0%, #f7c5d0 100%)" }}>
            <div className="absolute inset-x-0 top-0 h-3" style={{ background: "var(--gradient-rose)" }} />
          </div>
          {/* Middle tier */}
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-60 h-24 rounded-3xl shadow-luxury overflow-hidden" style={{ background: "linear-gradient(180deg, #fff 0%, #f5d6a8 100%)" }}>
            <div className="absolute inset-x-0 top-0 h-3" style={{ background: "var(--gradient-gold)" }} />
          </div>
          {/* Bottom tier */}
          <div className="absolute top-52 left-1/2 -translate-x-1/2 w-72 h-28 rounded-3xl shadow-luxury overflow-hidden" style={{ background: "linear-gradient(180deg, #fff5e1 0%, #d4b8e8 100%)" }}>
            <div className="absolute inset-x-0 top-0 h-3" style={{ background: "linear-gradient(135deg, #d4b8e8, #f7c5d0)" }} />
            {sliced && (
              <motion.div
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: 80, opacity: 0, rotate: 25 }}
                transition={{ duration: 1.4 }}
                className="absolute top-0 right-0 w-16 h-full"
                style={{ background: "linear-gradient(135deg, #fff, #f7c5d0)", clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
              />
            )}
          </div>

          {/* Plate */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-3 rounded-full opacity-60" style={{ background: "var(--gradient-gold)" }} />
        </motion.div>

        <AnimatePresence mode="wait">
          {message && (
            <motion.p
              key={message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-display italic text-xl md:text-2xl text-pearl/90 mb-10 max-w-xl mx-auto min-h-[3rem]"
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {[
            { label: "Light The Candles", action: light, disabled: stage !== "idle" },
            { label: "Make A Wish", action: wish, disabled: stage === "idle" || stage === "blown" || stage === "cut" },
            { label: "Blow Out The Candles", action: blow, disabled: stage === "idle" || stage === "blown" || stage === "cut" },
            { label: "Cut The Cake", action: cut, disabled: stage !== "blown" },
          ].map((b) => (
            <motion.button
              key={b.label}
              onClick={b.action}
              disabled={b.disabled}
              whileHover={!b.disabled ? { scale: 1.05, y: -2 } : {}}
              whileTap={!b.disabled ? { scale: 0.97 } : {}}
              className="glass rounded-full px-5 py-3 text-xs md:text-sm uppercase tracking-[0.2em] text-pearl disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              {b.label}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
