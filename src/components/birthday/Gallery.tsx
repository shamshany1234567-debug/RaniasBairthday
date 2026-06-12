import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Photo { src: string; caption?: string; }

const photoLayouts = [
  "md:col-span-8 md:row-span-2",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-7",
  "md:col-span-5",
];

export function Gallery({ title, subtitle, photos }: { title: string; subtitle: string; photos: Photo[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden px-6 py-32">
      <div className="gallery-ambient" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 grid items-end gap-8 text-left md:grid-cols-[1fr_auto]"
        >
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.5em] text-champagne/65">Chapter One · Our Story</p>
            <h2 className="font-display max-w-3xl text-5xl leading-[0.95] text-gold md:text-7xl">{title}</h2>
          </div>
          <p className="font-display max-w-sm border-l border-champagne/25 pl-6 text-xl italic leading-relaxed text-pearl/70">{subtitle}</p>
        </motion.div>

        <div className="gallery-mobile-track -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-5 md:mx-0 md:grid md:grid-cols-12 md:auto-rows-[17rem] md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (index % 4) * 0.08 }}
              className={`aspect-[4/5] w-[78vw] shrink-0 snap-center overflow-hidden rounded-3xl md:w-auto md:shrink md:overflow-hidden md:rounded-2xl md:aspect-auto ${photoLayouts[index] ?? "md:col-span-4"}`}
            >
              <Button variant="gallery" size="gallery" onClick={() => setSelected(index)} aria-label={`Open memory ${index + 1}`} className="h-full min-h-0">
                <img src={photo.src} alt={photo.caption || `Birthday memory ${index + 1}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]" />
                <span className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-55 transition-opacity duration-500 group-hover:opacity-80" />
                <span className="absolute bottom-4 left-5 font-display text-2xl italic text-pearl/85">{String(index + 1).padStart(2, "0")}</span>
                <span className="absolute bottom-5 right-5 text-[9px] uppercase tracking-[0.3em] text-champagne/0 transition-colors duration-500 group-hover:text-champagne/75">View memory</span>
              </Button>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selected !== null && photos[selected] && (
            <motion.div className="fixed inset-0 z-50 grid place-items-center bg-background/90 p-5 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
              <motion.figure className="relative" initial={{ scale: 0.9, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 24 }} onClick={(event) => event.stopPropagation()}>
                <img src={photos[selected].src} alt={photos[selected].caption || "Selected birthday memory"} className="max-h-[84vh] max-w-[92vw] rounded-2xl object-contain shadow-luxury" />
                <figcaption className="mt-4 text-center text-[10px] uppercase tracking-[0.4em] text-champagne/60">Memory · {String(selected + 1).padStart(2, "0")}</figcaption>
              </motion.figure>
              <Button variant="celebration" className="absolute right-5 top-5 h-11 w-11 p-0 text-lg" onClick={() => setSelected(null)} aria-label="Close image">×</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
