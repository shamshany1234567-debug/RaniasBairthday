import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Photo { src: string; caption?: string; }

export function Gallery({ title, subtitle, photos }: { title: string; subtitle: string; photos: Photo[] }) {
  const [selected, setSelected] = useState<number | null>(null);

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

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (index % 4) * 0.08 }}
              className={index === 0 || index === 7 ? "col-span-2 row-span-2" : ""}
            >
              <Button variant="gallery" size="gallery" onClick={() => setSelected(index)} aria-label={`Open memory ${index + 1}`}>
                <img src={photo.src} alt={photo.caption || `Birthday memory ${index + 1}`} loading="lazy" className={index === 0 || index === 7 ? "aspect-[4/3] w-full object-cover" : "aspect-square w-full object-cover"} />
                <span className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent opacity-40 transition-opacity group-hover:opacity-80" />
                <span className="absolute bottom-3 left-4 text-[10px] tracking-[0.35em] text-pearl/80">{String(index + 1).padStart(2, "0")}</span>
              </Button>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selected !== null && photos[selected] && (
            <motion.div className="fixed inset-0 z-50 grid place-items-center bg-background/90 p-5 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
              <motion.img src={photos[selected].src} alt={photos[selected].caption || "Selected birthday memory"} className="max-h-[86vh] max-w-[92vw] rounded-3xl object-contain shadow-luxury" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(event) => event.stopPropagation()} />
              <Button variant="celebration" className="absolute right-5 top-5 h-11 w-11 p-0 text-lg" onClick={() => setSelected(null)} aria-label="Close image">×</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
