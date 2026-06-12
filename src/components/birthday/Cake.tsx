import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

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
          className="cake-scene relative mx-auto w-80 md:w-105 h-80 md:h-105 mb-12"
          animate={candleLit ? { filter: "drop-shadow(0 0 60px oklch(0.92 0.15 60 / 0.6))" } : {}}
        >
          {/* Candles */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-7 z-20">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <AnimatePresence>
                  {candleLit && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0, y: -20 }}
                      className="candle-flame animate-flicker"
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
                <div className="candle-stick" />
              </div>
            ))}
          </div>

          {/* Top tier */}
          <div className="cake-tier cake-tier-top absolute top-16 left-1/2 -translate-x-1/2 w-46 md:w-52 h-21">
            <div className="cake-icing cake-icing-rose" />
            <span className="cake-pearl left-[18%]" /><span className="cake-pearl left-1/2" /><span className="cake-pearl right-[18%]" />
          </div>
          {/* Middle tier */}
          <div className="cake-tier cake-tier-middle absolute top-34 left-1/2 -translate-x-1/2 w-64 md:w-72 h-25">
            <div className="cake-icing cake-icing-gold" />
            <div className="cake-garland" aria-hidden="true">✦　✧　✦　✧　✦</div>
          </div>
          {/* Bottom tier */}
          <div className="cake-tier cake-tier-bottom absolute top-55 left-1/2 -translate-x-1/2 w-78 md:w-88 h-29">
            <div className="cake-icing cake-icing-lavender" />
            <div className="cake-monogram font-display">R</div>
            {sliced && (
              <motion.div
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: 80, opacity: 0, rotate: 25 }}
                transition={{ duration: 1.4 }}
                className="absolute top-0 right-0 w-16 h-full"
                className="absolute top-0 right-0 w-16 h-full cake-slice"
              />
            )}
          </div>

          {/* Plate */}
          <div className="cake-plate absolute bottom-0 left-1/2 -translate-x-1/2 w-82 md:w-98 h-5" />
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
            <motion.div
              key={b.label}
              whileHover={!b.disabled ? { scale: 1.05, y: -2 } : {}}
              whileTap={!b.disabled ? { scale: 0.97 } : {}}
            >
              <Button variant="celebration" size="lg" onClick={b.action} disabled={b.disabled}>
                {b.label}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
