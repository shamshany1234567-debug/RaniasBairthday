import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Photo { src: string; caption?: string; }

export function Gallery({ title, subtitle, photos }: { title: string; subtitle: string; photos: Photo[] }) {
  // stack = remaining (top is last item). revealed = cards already tapped, in tap order.
  const [stack, setStack] = useState<number[]>(photos.map((_, i) => i));
  const [revealed, setRevealed] = useState<number[]>([]);
  const [collecting, setCollecting] = useState(false);

  const total = photos.length;

  const handleStackClick = () => {
    if (collecting || stack.length === 0) return;
    const top = stack[stack.length - 1];
    setStack((s) => s.slice(0, -1));
    setRevealed((r) => [...r, top]);
  };

  const handleRevealedClick = () => {
    // Only collect once everything has been revealed
    if (collecting) return;
    if (stack.length > 0) return;
    setCollecting(true);
    setTimeout(() => {
      setStack(photos.map((_, i) => i));
      setRevealed([]);
      setCollecting(false);
    }, 850);
  };

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-pearl/60 text-xs uppercase tracking-[0.5em] mb-4">Memories</p>
          <h2 className="font-display text-3xl md:text-5xl text-gold max-w-3xl mx-auto leading-tight">{title}</h2>
          <p className="font-display italic text-pearl/70 text-lg md:text-xl mt-4">{subtitle}</p>
        </motion.div>

        {/* Stage */}
        <div className="relative mx-auto w-full" style={{ height: 620 }}>
          {/* Revealed pile — tapped cards move up, shrink, and stay behind the active stack card */}
          {revealed.map((idx, i) => {
            const fromTop = revealed.length - 1 - i;
            const isLastRevealed = stack.length === 0 && i === revealed.length - 1;
            const offsetY = -96 - fromTop * 18;
            const offsetX = (i % 2 === 0 ? -1 : 1) * (18 + fromTop * 5);
            const rot = (i % 2 === 0 ? -1 : 1) * (4 + fromTop * 0.8);
            const scale = Math.max(0.72, 0.84 - fromTop * 0.025);

            return (
              <motion.button
                key={`r-${idx}`}
                initial={{ opacity: 0, scale: 1, x: 0, y: 0, rotate: 0 }}
                animate={
                  collecting
                    ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 0 }
                    : { x: offsetX, y: offsetY, rotate: rot, scale, opacity: fromTop > 5 ? 0 : 1 }
                }
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                onClick={isLastRevealed ? handleRevealedClick : undefined}
                whileHover={isLastRevealed ? { y: offsetY - 8 } : undefined}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl"
                style={{
                  width: 320,
                  height: 400,
                  zIndex: 20 - fromTop,
                  cursor: isLastRevealed ? "pointer" : "default",
                  pointerEvents: isLastRevealed ? "auto" : "none",
                  boxShadow:
                    "0 30px 60px -25px oklch(0 0 0 / 0.75), 0 0 0 1px oklch(0.82 0.09 45 / 0.25)",
                }}
              >
                <img src={photos[idx].src} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                {isLastRevealed && (
                  <div className="absolute inset-x-0 bottom-3 text-center text-[10px] uppercase tracking-[0.4em] text-pearl/90">
                    Tap to gather
                  </div>
                )}
              </motion.button>
            );
          })}


          {/* Stack (still-to-reveal) */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: 320, height: 400, zIndex: 50 }}
          >
            {stack.map((idx, stackPos) => {
              const fromTop = stack.length - 1 - stackPos; // 0 = top
              const isTop = fromTop === 0;
              return (
                <motion.button
                  key={`s-${idx}`}
                  onClick={isTop ? handleStackClick : undefined}
                  disabled={!isTop}
                  initial={false}
                  animate={{
                    y: fromTop * 18,
                    x: 0,
                    scale: 1 - fromTop * 0.05,
                    rotate: 0,
                    opacity: fromTop > 4 ? 0 : 1,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={isTop ? { y: -8 } : undefined}
                  style={{
                    zIndex: 50 - fromTop,
                    cursor: isTop ? "pointer" : "default",
                    boxShadow:
                      "0 40px 80px -30px oklch(0 0 0 / 0.8), 0 0 0 1px oklch(1 0 0 / 0.06)",
                  }}
                  className="absolute inset-0 overflow-hidden rounded-3xl"
                >
                  <img
                    src={photos[idx].src}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-[oklch(0.82_0.09_45/0.25)]" />
                </motion.button>
              );
            })}
          </div>
        </div>

        <p className="text-center text-pearl/40 text-[11px] uppercase tracking-[0.4em] mt-2">
          {stack.length > 0
            ? `Tap to reveal · ${revealed.length} / ${total}`
            : "Tap the last memory to gather them back"}
        </p>
      </div>
    </section>
  );
}
