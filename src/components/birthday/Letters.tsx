import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Letters({ letters }: { letters: string[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-pearl/60 text-xs uppercase tracking-[0.5em] mb-4">Chapter Two · Written For You</p>
        <h2 className="font-display text-4xl md:text-6xl text-gold mb-5">Letters From My Heart</h2>
        <p className="font-display italic text-xl text-pearl/65 mb-16">Five little pieces of everything you mean to me.</p>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 md:gap-7">
          {letters.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className={i === 4 ? "sm:col-span-2 sm:mx-auto sm:w-1/2" : ""}
            >
              <Button variant="gallery" size="gallery" onClick={() => setOpen(i)} className="letter-envelope aspect-[5/3.2]">
                <span className="letter-flap" aria-hidden="true" />
                <span className="letter-seal font-display" aria-hidden="true">R</span>
                <span className="absolute bottom-4 inset-x-0 text-[9px] uppercase tracking-[0.4em] text-pearl/50">Open letter · {String(i + 1).padStart(2, "0")}</span>
              </Button>
            </motion.div>
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
              className="letter-paper relative max-w-xl w-full rounded-[18px] p-10 md:p-14"
            >
              <div className="mb-6 text-center text-[10px] uppercase tracking-[0.5em] text-primary">
                From my heart · {String(open + 1).padStart(2, "0")}
              </div>
              <div className="letter-rule mx-auto mb-6 h-px w-16" />
              <p className="font-display text-center text-2xl italic leading-relaxed text-primary-foreground md:text-[28px]">
                "{letters[open]}"
              </p>
              <div className="letter-rule mx-auto mt-8 h-px w-16" />
              <Button variant="ghost" className="absolute right-3 top-3 h-9 w-9 rounded-full p-0 text-primary" onClick={() => setOpen(null)} aria-label="Close letter">×</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
