import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function Letters({ letters }: { letters: string[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-pearl/60 text-xs uppercase tracking-[0.5em] mb-4">Secret Letters</p>
        <h2 className="font-display text-3xl md:text-5xl text-gold mb-16">Words I've kept for you</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {letters.map((_, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              onClick={() => setOpen(i)}
              className="group relative aspect-[5/3.2] rounded-[14px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.22 0.025 320) 0%, oklch(0.18 0.03 330) 100%)",
                boxShadow:
                  "0 30px 60px -25px oklch(0 0 0 / 0.7), inset 0 1px 0 oklch(1 0 0 / 0.06), 0 0 0 1px oklch(0.82 0.09 45 / 0.18)",
              }}
            >
              {/* envelope flap */}
              <div
                className="absolute inset-x-0 top-0 h-1/2 origin-top transition-transform duration-700 group-hover:-rotate-x-[160deg]"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.25 0.03 325), oklch(0.2 0.025 320))",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  borderBottom: "1px solid oklch(0.82 0.09 45 / 0.25)",
                }}
              />
              {/* wax seal */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center font-display text-lg"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, oklch(0.78 0.11 45), oklch(0.55 0.13 25))",
                  color: "oklch(0.98 0.02 80)",
                  boxShadow:
                    "0 6px 14px -4px oklch(0 0 0 / 0.6), inset 0 -2px 4px oklch(0 0 0 / 0.25), inset 0 2px 3px oklch(1 0 0 / 0.25)",
                }}
              >
                ♥
              </div>
              {/* label */}
              <div className="absolute bottom-3 left-0 right-0 text-[10px] uppercase tracking-[0.4em] text-pearl/50">
                Letter · {String(i + 1).padStart(2, "0")}
              </div>
              {/* hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 60%, oklch(0.82 0.09 45 / 0.18), transparent 70%)",
                }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] bg-background/92 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.7, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.7, y: 30, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full rounded-[18px] p-10 md:p-14"
              style={{
                background:
                  "linear-gradient(155deg, oklch(0.97 0.012 85) 0%, oklch(0.93 0.02 60) 100%)",
                boxShadow:
                  "0 60px 120px -30px oklch(0 0 0 / 0.75), 0 0 0 1px oklch(0.82 0.09 45 / 0.3), inset 0 1px 0 oklch(1 0 0 / 0.6)",
              }}
            >
              <div className="text-center mb-6 text-[10px] uppercase tracking-[0.5em]" style={{ color: "oklch(0.55 0.08 35)" }}>
                Letter · {String(open + 1).padStart(2, "0")}
              </div>
              <div
                className="mx-auto mb-6 h-px w-16"
                style={{ background: "linear-gradient(90deg, transparent, oklch(0.65 0.13 35), transparent)" }}
              />
              <p
                className="font-display italic text-2xl md:text-[28px] leading-relaxed text-center"
                style={{ color: "oklch(0.22 0.04 25)" }}
              >
                "{letters[open]}"
              </p>
              <div
                className="mx-auto mt-8 h-px w-16"
                style={{ background: "linear-gradient(90deg, transparent, oklch(0.65 0.13 35), transparent)" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
