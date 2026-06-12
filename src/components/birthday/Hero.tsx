import { motion } from "framer-motion";

export function Hero({ title, subtitle, body, portrait }: { title: string; subtitle: string; body: string; portrait: string }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-7 max-w-3xl"
      >
        <motion.div
          initial={{ letterSpacing: "0.4em", opacity: 0 }}
          whileInView={{ letterSpacing: "0.05em", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="text-xs md:text-sm uppercase tracking-[0.5em] text-champagne/80"
        >
          A celebration
        </motion.div>
        <h1
          className="font-display text-6xl md:text-8xl lg:text-9xl text-gold leading-[0.95]"
          style={{ textShadow: "0 0 60px oklch(0.92 0.08 85 / 0.3)" }}
        >
          {title}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="font-display italic text-xl md:text-3xl text-pearl/90"
        >
          {subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1.5 }}
          className="text-pearl/70 text-base md:text-lg leading-relaxed whitespace-pre-line max-w-xl mx-auto"
        >
          {body}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 1.5 }}
          className="h-px w-40 mx-auto"
          style={{ background: "var(--gradient-gold)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.88 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="portrait-medallion mx-auto mt-10"
        >
          <span className="portrait-orbit" aria-hidden="true" />
          <span className="portrait-halo" aria-hidden="true" />
          <img
            src={portrait}
            alt="Birthday portrait for Rania"
            width={1024}
            height={1024}
            className="portrait-image"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
