import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export function QRSection({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  const download = () => {
    const canvas = ref.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "birthday-surprise-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "A surprise for you", url }); } catch {}
    } else copy();
  };

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="glass rounded-3xl p-8 md:p-10 text-center shadow-luxury"
        >
          <p className="text-pearl/60 text-xs uppercase tracking-[0.5em] mb-6">Share The Magic</p>
          <h3 className="font-display text-3xl md:text-4xl text-gold mb-8">Carry this gift with you</h3>
          <div
            ref={ref}
            className="inline-block p-5 rounded-2xl mb-8"
            style={{ background: "var(--pearl)" }}
          >
            <QRCodeCanvas
              value={url}
              size={200}
              level="H"
              fgColor="#3b2a3a"
              bgColor="transparent"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={download} className="rounded-full px-5 py-3 text-xs uppercase tracking-[0.2em] text-background" style={{ background: "var(--gradient-gold)" }}>
              Download
            </button>
            <button onClick={copy} className="glass rounded-full px-5 py-3 text-xs uppercase tracking-[0.2em] text-pearl">
              {copied ? "Copied ✓" : "Copy Link"}
            </button>
            <button onClick={share} className="glass rounded-full px-5 py-3 text-xs uppercase tracking-[0.2em] text-pearl">
              Share
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
