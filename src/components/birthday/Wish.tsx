import { motion } from "framer-motion";

export function Wish({ lines }: { lines: string[] }) {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="glass rounded-3xl p-10 md:p-16 text-center shadow-luxury relative overflow-hidden"
        >
          <div
            className="absolute -inset-px rounded-3xl opacity-50 pointer-events-none"
            style={{ background: "linear-gradient(135deg, oklch(0.92 0.08 85 / 0.4), transparent 40%, oklch(0.82 0.09 25 / 0.3))" }}
          />
          <p className="text-pearl/60 text-xs uppercase tracking-[0.5em] mb-8">A Wish</p>
          <div className="space-y-5">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18, duration: 0.9 }}
                className="font-display italic text-xl md:text-2xl text-pearl/90 leading-relaxed"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
